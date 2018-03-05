const datesBetween = require('dates-between')
const rp = require('request-promise')

let config = require('./config')



const getLatestDownloadedForCcy = (currencyConfig) => {
    // return '2000-01-01'
    return '2018-02-28'
}

const getDatesBetween = (startDate, endDate) => {
    let dates = [];
    for (let date of datesBetween(startDate, endDate)) {
        dates.push(date)
    }
    // console.log(`${JSON.stringify(dates)}`);
    return dates;
}

const getRequestUrlsForCcy = (currencyConfig, startDate = '2018-02-28') => {

    let endDate = new Date();
    endDate.setDate(endDate.getDate() - 1)

    let requestUrls = getDatesBetween(startDate, endDate)
        .map(date => `${date.toISOString().substr(0, 10)}`)
        .map(dateString => `${config.restApiRatesUrl}${dateString}?base=${currencyConfig.currency}`)

    console.log(`${JSON.stringify(requestUrls)}`);

    return requestUrls;
}

const getDataFromRest = async (urls) => {
    let res = [];
    for (let url of urls) {
        const options = {
            uri: url,
            json: true
        };
        let dayDataBody = await rp(options)
        res.push(dayDataBody);
    }
    return res;
}

const downloadMissingDataForCurrency = async (currencyConfig) => {

    // get lates date for currency
    let latestDownloadedForCcy = getLatestDownloadedForCcy(currencyConfig);
    let requestUrls = getRequestUrlsForCcy(currencyConfig, latestDownloadedForCcy);

    // console.log(requestUrls.length + ' dates should be downloaded')

    let curencyData = await getDataFromRest(requestUrls)

    return curencyData;
    // download all other dates
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