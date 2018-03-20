const rp = require('request-promise')
const dataService = require('../data-layer/databaseService')
let config = require('../config')


const shortIsoStringFromDate = (date) =>
    date.toISOString().substr(0, 10)

const getUrlForDate = (date, currency = 'EUR') => {
    let isoDate = shortIsoStringFromDate(date);
    let url = `${config.restApiRatesUrl}${isoDate}?base=${currency}`
    return url;
}

const getDataFromRest = async (url) => {
    const options = {
        uri: url,
        json: true
    };
    try {
        let dayDataBody = await rp(options)
        return dayDataBody;
    } catch (e) {
        console.log(`Error downloading data for ${url} with error ${e}`);
    }
    return null;
}

const downloadMissingDataForDate = async (date, currencyConfig) => {
    let url = getUrlForDate(date, currencyConfig.currency)
    let curencyData = await getDataFromRest(url);
    if (curencyData) {
        curencyData.exactDate = date;
        curencyData.exactDateStr = shortIsoStringFromDate(date);

        if (curencyData.base === 'EUR') {
            curencyData.rates.MKD = 61.5;
        } else {
            curencyData.rates.MKD = curencyData.rates.EUR * 61.5;
        }
        
        await dataService.saveDayData(currencyConfig, curencyData)
    }
}

const delay = async (ms) => {
    await new Promise((res, rej) => {
        setTimeout(() => {
            // console.log(`waiting for ${ms}`);
            res()
        }, ms)
    })
}

const getDates = (startDate, endDate) => {

    let res = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        res.push(new Date(d));
    }

    return res;
}

const downloadMissingDataForCurrency = async (currencyConfig) => {

    let latestDownloadedForCcy = await dataService.getLatestDownloadedForCcy(currencyConfig);

    let endDate = new Date();

    if (latestDownloadedForCcy.toISOString().substr(0, 10) === endDate.toISOString().substr(0, 10)) {
        console.log(`All dates already downloaded for ${currencyConfig.currency}`);
        // return
    }

    let startDate = new Date(latestDownloadedForCcy);
    startDate.setDate(latestDownloadedForCcy.getDate() + 1)

    let datesToBeDownloaded = getDates(startDate, endDate);


    for (date of datesToBeDownloaded) {

        await delay(config.delayBetweenCalls)
        await downloadMissingDataForDate(date, currencyConfig).catch(e => {
            downloadMissingDataForDate(date, currencyConfig)
        })
    }
}

const downloadMissingData = async () => {
    let startTime = new Date();
    for (let curencyConfig of config.currencies) {

        // dataService.removeolder(curencyConfig)

        let startTimeCurrency = new Date();
        console.log(`Downloading for ${curencyConfig.currency}`);
        try {
            await downloadMissingDataForCurrency(curencyConfig);
        } catch (e) {
            console.log(`${e}`);
        }

        let endTimeCurrency = new Date();
        console.log(`For currency ${curencyConfig.currency} it took      ${(endTimeCurrency - startTimeCurrency) / 1000} seconds `);
    }
    console.log(`For all currencies it took   ${(new Date() - startTime) / 1000} seconds `);
}

const startDownloadingInterval = () => {
    downloadMissingData()
    setInterval(() => {
        downloadMissingData().catch(e => {
            console.log(`${e}`);
        })
    }, 24 * 60 * 60 * 1000)
}

module.exports = { startDownloadingInterval }