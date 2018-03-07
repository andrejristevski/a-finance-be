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
    let dayDataBody = await rp(options)
    return dayDataBody;
}

const downloadMissingDataForCurrency = async (currencyConfig) => {

    // get lates date for currency
    let latestDownloadedForCcy = await dataService.getLatestDownloadedForCcy(currencyConfig);

    let endDate = new Date();
    endDate.setDate(endDate.getDate() - 1)

    if (latestDownloadedForCcy.toISOString().substr(0, 10) === endDate.toISOString().substr(0, 10)) {
        console.log(`All dates already downloaded for ${currencyConfig.currency}`);
        return;
    }

    let datesToBeDownloaded = getDatesBetween(latestDownloadedForCcy, endDate)

    for (date of datesToBeDownloaded) {

        let url = getUrlForDate(date, currencyConfig.currency)
        let curencyData = await getDataFromRest(url)
        curencyData.exactDate = date;
        curencyData.exactDateStr = shortIsoStringFromDate(date);

        await dataService.saveDayData(currencyConfig, curencyData)
        let breakpoint = 0;
    }
}

const downloadMissingData = async () => {
    for (let curencyConfig of config.currencies) {
        let missingDataForCurrency = await downloadMissingDataForCurrency(curencyConfig);
        let breakpoint = 0;
    }
}

const startDownloadingInterval = () => {
    // setInterval(() => {
    downloadMissingData();
    // }, 5 * 1000)


}

module.exports = { startDownloadingInterval }