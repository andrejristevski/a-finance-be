let dbClient = null;

const setDbclient = (_dbClient) => {
    dbClient = _dbClient;
}

const removeolder = async (currencyConfig) => {
    let date = new Date();
    date.setDate(date.getDate()-5);
    let oldObject = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).findOne();
    let a = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).updateOne({ '_id': oldObject._id }, { $set: { 'latestDownloadedDate': date } })
    let c = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.ratesCollection}`).remove({ 'exactDate': { $gt: date } })

    console.log(`finished deleting for ${currencyConfig.currency}`);
}

module.exports = {
    setDbclient,
    removeolder
}