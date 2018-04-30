const utils = require('./stratUtils')

const getAllTradedCcys = (exchanges) => {
    let res = {}

    for (let i = 0; i < exchanges.length; i++) {
        let exchange = exchanges[i].exchange;
        res[exchange.inputCcy] = true;
        res[exchange.outCcy] = true;
    }

    return Object.keys(res);
}


const getPossibleBalance = (ccys, exchangesAndRates) => {

    let latestExchange = exchangesAndRates[exchangesAndRates.length - 1].exchange;
    let currentBalance = latestExchange.balance;
    let currentCcy = latestExchange.outCcy;
    let latestRates = exchangesAndRates[exchangesAndRates.length - 1].latestRates.latestOutputRates;

    let res = {
        currentCcy,
        currentBalance,
        possibleBalance: {}
    };

    ccys.forEach(ccy => {
        if (currentCcy !== ccy) {
            res.possibleBalance[ccy] = currentBalance * latestRates.rates[ccy];
        }
    })
    return res;
}

const getLatestExchangesForCcys = (allTradedCcys, exchangesAndRates) => {

    let latestExchange = exchangesAndRates[exchangesAndRates.length - 1].exchange;
    let currentCcy = latestExchange.outCcy;

    let res = {}

    for (let i = 0; i < allTradedCcys.length; i++) {
        let ccy = allTradedCcys[i];

        if (ccy !== currentCcy) {

            let latestExchangeForCcy = exchangesAndRates
                .filter(exc => exc.exchange.inputCcy === ccy)
                .reverse()[0]
            res[ccy] = latestExchangeForCcy.exchange;
        }

    }
    return res;
}

const getDifferences = (latestBalances, latestExchangesForCcys) => {

    let res = {}

    Object.keys(latestBalances.possibleBalance).forEach(key => {
        res[key] = latestExchangesForCcys[key].sum - latestBalances.possibleBalance[key];
    })

    return res;
}

const process = (exchanges) => {

    const allTradedCcys = getAllTradedCcys(exchanges);
    const latestBalances = getPossibleBalance(allTradedCcys, exchanges);

    const latestExchangesForCcys = getLatestExchangesForCcys(allTradedCcys, exchanges)
    const latestRateDiff = getDifferences(latestBalances, latestExchangesForCcys)

    return {
        latestBalances,
        allTradedCcys,
        latestRateDiff,
    };

}

module.exports = {
    process
}
