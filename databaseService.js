let dbClient = null;


const setDbclient = (_dbClient) => {
    dbClient = _dbClient;
}

const getLatestDownloadedForCcy = async (currencyConfig) => {
    let res = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).findOne()
    if (res) {
        return Promise.resolve(res.latestDownloadedDate);
    } else {
        const date = new Date('2018-03-01');
        dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).insertOne({ 'latestDownloadedDate': date })
        return Promise.resolve(date)
    }
}

const updateLastDownloaded = async (currencyConfig, date) => {
    // self.db[self.dbConfig['metadataCollection']].update({'_id':id},{'latestDownloadedDate': data})
    // let metaData = getLatestDownloadedForCcy(currencyConfig)
    try {

        let ah = new Date('1995-04-02')
        let brasd = 0;
        console.log(`najgore`);
        let oldObject = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).findOne();
        console.log(`${oldObject} id of old object`);
        let updated = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).updateOne({ '_id': oldObject._id }, { $set: { 'latestDownloadedDate': ah } })
        console.log(`${updated} updated`);
        let findsome = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).findOne({ '_id': oldObject._id });
        console.log(`${findsome} latest taken`);

        console.log(`${JSON.stringify(oldObject)} asdasdasd`);
        return Promise.resolve()
    } catch (e) {
        console.log(e);
    }

    let brp = 0;
    console.log(`najdolu`);
    return Promise.resolve()
}

const saveDayData = async (currencyConfig, data) => {
    let cekaj = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.ratesCollection}`).insertOne(data)
    let cek2 = await updateLastDownloaded(currencyConfig, data.exactDate);
    return Promise.resolve()
}

module.exports = {
    setDbclient,
    saveDayData,
    getLatestDownloadedForCcy
}