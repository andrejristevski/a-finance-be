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
        } else {
            res.possibleBalance[ccy] = currentBalance;
        }
    })
    return res;
}

/**
 * Gets latest exchanges 
 */
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
        if (latestExchangesForCcys[key]) {
            res[key] = latestBalances.possibleBalance[key] - latestExchangesForCcys[key].sum;
        } else {
            res[key] = 0;
        }
    })

    return res;
}

const isCcyInputInExchange = (ccy, exchange) => {
    if (exchange.inputCcy === ccy) {
        return true;
    }
    return false
}

const isCcyOutputInExchange = (ccy, exchange) => {
    if (exchange.outCcy === ccy) {
        return true;
    }
    return false
}

const calculateNeutralRate = (overallSold, overallUnitsSold,
    overallBougth, overallUnitsBought) => {

    const overallDiff = overallSold - overallBougth;
    const overallUnits = overallUnitsSold - overallUnitsBought;

    if (overallDiff > 0) {
        if (overallUnits !== 0) {
            return overallDiff / overallUnits
        }
    } else {
        return overallUnits / overallDiff;
    }

    return 1;
}

/**
 * Summ up all sum*rate when we bought and all sum*rate when we sold 
 * Substract at the end
 * Also number of times traded, overall traded, % of overall traded
 */
const getOverallTradingForCcys = (allTradedCcys, exchangesAndRates) => {

    let res = {}

    for (let i = 0; i < allTradedCcys.length; i++) {

        let ccy = allTradedCcys[i];
        let overallBougth = 0;
        let overallSold = 0;
        let overallUnitsSold = 0;
        let overallUnitsBought = 0;

        exchangesAndRates.forEach(excAndRates => {

            let exchange = excAndRates.exchange;
            if (isCcyInputInExchange(ccy, excAndRates.exchange)) {
                overallSold += exchange.sum * exchange.exchangeRate;
                overallUnitsSold += exchange.sum;
            }

            if (isCcyOutputInExchange(ccy, excAndRates.exchange)) {
                overallBougth += exchange.sum;
                overallUnitsBought += exchange.sum * exchange.exchangeRate;
            }

        })

        const neutralRate = calculateNeutralRate(overallSold, overallUnitsSold,
            overallBougth, overallUnitsBought);

        res[ccy] = {
            overallSold,
            overallBougth,
            overallUnitsSold,
            overallUnitsBought,
            neutralRate
        }
    }
    return res;
}

const getCurrentCcy = (exchangesAndRates) => {
    let latestExchange = exchangesAndRates[exchangesAndRates.length - 1].exchange;
    let currentCcy = latestExchange.outCcy;
    return currentCcy;
}


const process = (data) => {
    let exchanges = data.exchangesAndRates;
    if (exchanges.length === 0) {
        return;
    }

    const allTradedCcys = getAllTradedCcys(exchanges);
    const latestBalances = getPossibleBalance(allTradedCcys, exchanges);

    const latestExchangesForCcys = getLatestExchangesForCcys(allTradedCcys, exchanges)
    const latestRateDiff = getDifferences(latestBalances, latestExchangesForCcys)
    const ccysOverallTrading = getOverallTradingForCcys(allTradedCcys, exchanges)

    const ccy = getCurrentCcy(exchanges);
    const latestRates = data.latestRatesForCcy[ccy]

    return {
        latestBalances,
        allTradedCcys,
        latestRateDiff,
        ccysOverallTrading,
        latestExchangesForCcys,
        latestRates
    };

}

module.exports = {
    process
}
