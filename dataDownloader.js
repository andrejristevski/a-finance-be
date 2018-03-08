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

    } else {

        setTimeout(() => {
            downloadMissingDataForCurrency(currencyConfig);
            console.log(`Starting again and breaking once`);
        }, 1000);
        return
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
    endDate.setDate(endDate.getDate() - 1)

    if (latestDownloadedForCcy.toISOString().substr(0, 10) === endDate.toISOString().substr(0, 10)) {
        console.log(`All dates already downloaded for ${currencyConfig.currency}`);F
        return;
    }

    let datesToBeDownloaded = getDatesBetween(latestDownloadedForCcy, endDate);

    for (date of datesToBeDownloaded) {
        downloadMissingDataForDate(date, currencyConfig)
        // TODO delay can be taken from config, this is not a problem usually because only one date will be downloaded, but without the delay
        // if there are a lot of dates the server will stop us because we send to many requests
        await delay(1000)
    }
}

const downloadMissingData = async () => {
    let startTime = new Date();
    for (let curencyConfig of config.currencies) {
        let startTimeCurrency = new Date();
        await downloadMissingDataForCurrency(curencyConfig);
        let endTimeCurrency = new Date();
        console.log(```For currency ${curencyConfig.currency} it took
         ${(endTimeCurrency - startTimeCurrency) / 1000} seconds ```);
    }
    console.log(```For all currencies it took
         ${(new Date() - startTimeCurrency) / 1000} seconds ```);
}

const startDownloadingInterval = () => {
    // setInterval(() => {
    downloadMissingData();
    // }, 5 * 1000)


}

module.exports = { startDownloadingInterval }