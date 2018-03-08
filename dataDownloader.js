const datesBetween = require('dates-between')
const rp = require('request-promise')
const dataService = require('./databaseService')
let config = require('./config')


const getDatesBetween = (startDate, endDate) => {
    let dates = [];
    for (let date of datesBetween(startDate, endDate)) {
        dates.push(date)
    }
    return dates;
}

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
        await dataService.saveDayData(currencyConfig, curencyData)
    }

}

const delay = (ms) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, ms)
    })
}

const downloadMissingDataForCurrency = async (currencyConfig) => {

    let latestDownloadedForCcy = await dataService.getLatestDownloadedForCcy(currencyConfig);

    let endDate = new Date();

    if (latestDownloadedForCcy.toISOString().substr(0, 10) === endDate.toISOString().substr(0, 10)) {
        console.log(`All dates already downloaded for ${currencyConfig.currency}`);
        return Promise.resolve();
    }

    let datesToBeDownloaded = getDatesBetween(latestDownloadedForCcy, endDate);

    for (date of datesToBeDownloaded) {
        downloadMissingDataForDate(date, currencyConfig)
        // TODO delay can be taken from config, this is not a problem usually because only one date will be downloaded, but without the delay
        // if there are a lot of dates the server will stop us because we send to many requests
        await delay(config.delayBetweenCalls)
    }
}

const downloadMissingData = async () => {
    let startTime = new Date();
    for (let curencyConfig of config.currencies) {

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
    console.log(```For all currencies it took
         ${(new Date() - startTime) / 1000} seconds ```);
}

const startDownloadingInterval = () => {
    downloadMissingData();
    setInterval(() => {
        downloadMissingData();
    }, 24 * 60 * 60 * 1000)


}

module.exports = { startDownloadingInterval }