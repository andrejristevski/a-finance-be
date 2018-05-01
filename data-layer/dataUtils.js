let dbClient = null;

const setDbclient = (_dbClient) => {
    dbClient = _dbClient;
}

const removeolder = async (currencyConfig) => {
    let date = new Date();
    date.setDate(date.getDate() - 5);
    let oldObject = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).findOne();
    let a = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.metadataCollection}`).updateOne({ '_id': oldObject._id }, { $set: { 'latestDownloadedDate': date } })
    let c = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.ratesCollection}`).remove({ 'exactDate': { $gt: date } })

    console.log(`finished deleting for ${currencyConfig.currency}`);
}

const addMkdCollection = async (currencyConfig) => {

    // get all rates for euro
    let allEuroRatesCursor = await dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.ratesCollection}`).find({});
    let number = dbClient.db(`${currencyConfig.dbName}`).collection(`${currencyConfig.ratesCollection}`).count();

    let mkdCollection = [];


    allEuroRatesCursor.each((err, elem) => {

        elem.base = 'MKD'
        Object.keys(elem.rates).forEach(key => {
            elem.rates[key] = elem.rates[key] / 61.5;
        })

        mkdCollection.push(elem)

    })


}



module.exports = {
    setDbclient,
    removeolder,
    addMkdCollection
}