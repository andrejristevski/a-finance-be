
const dataService = require('../../data-layer/databaseService')
const ExchangeModel = require('../../models/Exchange')

const getProgresiveExchangesRates = async (exchanges) => {
    // return new Promise(async (resolve, reject) => {

    let res = []

    for (let i = 0; i < exchanges.length; i++) {
        let exchange = exchanges[i];

        let ccyRates = await dataService.getRatesBetweenDates(exchange.date, new Date(), exchange.inputCcy)
        // take the rates from exchange date to today and make a graph
        // res[]
        debugger
        res.push({
            date: exchange.date,
            inputCcy: exchange.inputCcy,
            rates: ccyRates
        })
        // inputCcyExchanges.

    }
    debugger
    return res;
    // resolve(res);
    // })
}


const getData = async (user) => {
    return new Promise((res, rej) => {
        ExchangeModel.find({ userId: user._id }, (err, exchanges) => {
            if (err) {
                console.log(`${err}`);
                rej(err);
            }

            getProgresiveExchangesRates(exchanges)
                .then(data => {
                    // napraj realna data i na nea isracunaj
                    debugger;
                    
                })
            // res(exchanges);
        });
    });
}


module.exports = {
    getData
}