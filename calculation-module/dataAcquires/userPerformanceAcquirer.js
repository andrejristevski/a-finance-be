
const dataService = require('../../data-layer/databaseService')
const ExchangeModel = require('../../models/Exchange')

const getProgresiveExchangesRates = async (exchanges) => {

    let res = []

    for (let i = 0; i < exchanges.length; i++) {
        let exchange = exchanges[i];

        let ccyRates = await dataService.getRatesForDate(exchange.date, exchange.inputCcy)
        let latestInputRates = await dataService.getLatestRatesForCcy(exchange.inputCcy)
        let latestOutputRates = await dataService.getLatestRatesForCcy(exchange.outCcy)


        res.push({
            exchange,
            rates: ccyRates,
            latestRates: {
                latestInputRates,
                latestOutputRates
            }
        })

    }
    return res;
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
                    res(data);
                })
        });
    });
}


module.exports = {
    getData
}