
const dataService = require('../../data-layer/databaseService')

const getData = async (startDate, endDate, inpCur) => {
    let data = await dataService.getRatesBetweenDates(startDate, endDate, inpCur)
    return data;
}


module.exports = {
    getData
}