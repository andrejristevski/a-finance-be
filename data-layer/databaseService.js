
const dataUtils = require('../calculation-module/dataAcquires/dataAcquirerUtils')

let dbClient = null;

const setDbclient = (_dbClient) => {
    dbClient = _dbClient;
}

const getLatestDownloadedForCcy = async (currencyConfig) => {
    let res = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).findOne()
    if (res) {
        return res.latestDownloadedDate;
    } else {
        // TODO this can be taken from config
        const date = new Date('2000-01-01');
        dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).insertOne({ 'latestDownloadedDate': date })
        console.log(`Created metadata collection`);
        return date
    }
}

const updateLastDownloaded = async (currencyConfig, date) => {
    try {
        let oldObject = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).findOne();
        await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).updateOne({ '_id': oldObject._id }, { $set: { 'latestDownloadedDate': date } })
    } catch (e) {
        console.log(`Error in updateing metadata`);
        console.log(e);
    }
}

const saveDayData = async (currencyConfig, data) => {
    try {
        await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.ratesCollection}`).insertOne(data)
        await updateLastDownloaded(currencyConfig, data.exactDate);

        console.log(`Saved for: ${data.exactDateStr}`);

    } catch (e) {
        console.log(`Error saving data : ${e}`);
    }
}

const getRatesForDate = async (date, inpCur) => {
    let currencyConfig = dataUtils.getConfigForCurency(inpCur);

    let rates = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.ratesCollection}`).findOne({ "exactDate": { "$eq": date } })
    return rates;

}

const getLatestRatesForCcy = async (inpCur) => {
    let currencyConfig = dataUtils.getConfigForCurency(inpCur);

    let rates = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.ratesCollection}`).findOne({}, { sort: { $natural: -1 } });
    return rates;

}

const getRatesBetweenDates = async (startDate, endDate, inpCur) => {

    let currencyConfig = dataUtils.getConfigForCurency(inpCur)
    let cursor = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.ratesCollection}`).find({ "exactDate": { "$gt": startDate, "$lte": endDate } })

    return cursor.toArray();
}

module.exports = {
    setDbclient,
    saveDayData,
    getLatestDownloadedForCcy,
    getRatesBetweenDates,
    getRatesForDate,
    getLatestRatesForCcy
}