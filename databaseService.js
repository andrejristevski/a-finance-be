
let dbClient = null;

const setDbclient = (_dbClient) => {
    dbClient = _dbClient;
}

const updateLastDownloaded = (config, date) => {
    // self.db[self.dbConfig['metadataCollection']].update({'_id':id},{'latestDownloadedDate': data})
    dbClient.db(`${config.dbName}`).collection(`${config.ratesCollection}`).update()

}

const saveDayData = async (config, data) => {
    dbClient.db(`${config.dbName}`).collection(`${config.ratesCollection}`).insertOne(data)
    updateLastDownloaded(config, data.exactDate)

}

const getLatestDownloadedForCcy = async (currencyConfig) => {
    let res = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).findOne()
    if (res) {
        return res.latestDownloadedDate;
    } else {
        const date = new Date('2018-03-01'); 
        dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).insertOne({'latestDownloadedDate': date})
        return date
    }
}
module.exports = {
    setDbclient,
    saveDayData,
    getLatestDownloadedForCcy
}