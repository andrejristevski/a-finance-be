const datesBetween = require('dates-between')
const fetch = require('node-fetch')

let config = require('./config')

// arrayScrapper(urls, function (successBodies, errors) {

// } , ? options);

// let options = {
//     timeout: 50, //timeout between http calls 
//     logtotal: false
// }

// for (const date of datesBetween(new Date('2016-01-01'), new Date('2016-02-01'))) {
//     // console.log(date);
// }


const getLatestDownloadedForCcy = (currencyConfig) => {
    // return '2000-01-01'
    return '2018-02-28'
}

const getDatesBetween = (startDate, endDate) => {
    let dates = [];
    for (let date of datesBetween(startDate, endDate)) {
        dates.push(date)
    }
    return dates;
}

const getRequestUrlsForCcy = (currencyConfig, startDate = '2018-02-28') => {

    const endDate = new Date();
    let requestUrls = getDatesBetween(startDate, endDate)
        .map(date => `${date.toISOString().substr(0, 10)}`)
        .map(dateString => `${config.restApiRatesUrl}/${dateString}?base=${currencyConfig.currency}`)

    return requestUrls;
}

const getDataFromRest = async (urls) => {
    let res = [];
    for (let url of urls) {
        let dayDataBody = await fetch(url)
        let js = await dayDataBody.json()
        res.push(js);
        // console.log(`${JSON.stringify(dayData)} data pushuva`);
    }
    return res
}

const downloadMissingDataForCurrency = (currencyConfig) => {
    return new Promise((resolve, reject) => {

        // get lates date for currency
        let latestDownloadedForCcy = getLatestDownloadedForCcy(currencyConfig);
        let requestUrls = getRequestUrlsForCcy(currencyConfig, latestDownloadedForCcy);

        console.log(requestUrls.length + ' dates should be downloaded')

        let curencyData = getDataFromRest(requestUrls)

        resolve(curencyData)
    })
    // download all other dates
}

const downloadMissingData = async () => {
    for (let curencyConfig of config.currencies) {
        let sth = await downloadMissingDataForCurrency(curencyConfig);
        // console.log(`ahhhhhhhhhhhhhhhhhhh ${JSON.stringify(sth)}`);
    }
    // console.log(' 5s')
}

const startDownloadingInterval = () => {
    // setInterval(() => {
    downloadMissingData();
    // }, 5 * 1000)


}

module.exports = { startDownloadingInterval }