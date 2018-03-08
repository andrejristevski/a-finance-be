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
        return await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).updateOne({ '_id': oldObject._id }, { $set: { 'latestDownloadedDate': date } })
        console.log(`Update metadata to ${date.toISOString().substr(0, 10)}`);
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

module.exports = {
    setDbclient,
    saveDayData,
    getLatestDownloadedForCcy
}