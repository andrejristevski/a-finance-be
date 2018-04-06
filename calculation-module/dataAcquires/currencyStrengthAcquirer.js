
const dataService = require('../../data-layer/databaseService')

const getData = async (startDate, endDate, outCur) => {

    let currenciesDataPromises = [];
    for (let i = 0; i < outCur.length; i++) {
        let currency = outCur[i];
        let currentCurrencyDataPromise = dataService.getRatesBetweenDates(startDate, endDate, currency)
        currenciesDataPromises.push(currentCurrencyDataPromise)
    }
//
    const resolvedValues = await Promise.all(currenciesDataPromises);
    return resolvedValues;
}


module.exports = {
    getData
}
