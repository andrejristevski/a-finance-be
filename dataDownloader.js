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

    let datesToBeDownloaded = getDatesBetween(latestDownloadedForCcy, endDate)

    for (date of datesToBeDownloaded) {

        let url = getUrlForDate(date, currencyConfig.currency)
        let curencyData = await getDataFromRest(url)
        curencyData.exactDate = date;
        curencyData.exactDateStr = shortIsoStringFromDate(date);

        await dataService.saveDayData(currencyConfig, curencyData)
        let breakpoint = 0;
    }
    // download all other dates
    return Promise.resolve();
}

const saveCurencyData = (curencyConfig, missingDataForCurrency) => {



}

const downloadMissingData = async () => {
    for (let curencyConfig of config.currencies) {
        let missingDataForCurrency = await downloadMissingDataForCurrency(curencyConfig);
        // console.log(`ahhhhhhhhhhhhhhhhhhh ${JSON.stringify(sth)}`);
        let breakpoint = 0;

        saveCurencyData(curencyConfig, missingDataForCurrency)
        // insert data into db
    }
    // console.log(' 5s')
}

const startDownloadingInterval = () => {
    // setInterval(() => {
    downloadMissingData();
    // }, 5 * 1000)


}

module.exports = { startDownloadingInterval }