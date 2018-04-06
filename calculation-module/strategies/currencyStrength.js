/**
 * Input more currencies. For every ccy go though all pairs and calculate how much % 
 * did the ccy raised of devalued. Build set of that data
 */


const utils = require('./stratUtils')

// if c is not inpCur:
//         curBaseRate = rates[0]['rates'][c]
//         curRates = getSingleValuedRatesForCur(rates, c)
//         res = []
//         for rate in curRates:
//             percentageChanged = abs(curBaseRate-rate)/curBaseRate*100
//             sign = -1 if rate < curBaseRate else 1
//             res.append(sign*percentageChanged)
//     return {
//         'rates': res,
//         'inpCur': inpCur,
//         'outputCur': c 
//     }      

const getSingeCcyChange = (data, testAgainst) => {

    const startPeriodOutCur = data[0].rates[testAgainst];
    const inpCcyRates = utils.getSingleRatesForCur(data, testAgainst);

    let res = [];
    for (let i = 0; i < inpCcyRates.length; i++) {
        const rate = inpCcyRates[i];
        const percentageChanged = Math.abs(startPeriodOutCur - rate) / startPeriodOutCur * 100;
        const sign = rate < startPeriodOutCur ? -1 : 1;
        res.push(sign * percentageChanged);
    }
    let breakpoint = 0;
    return res;
}

const buildDataSetForCcy = (data, outCur) => {

    let ccy = data[0].base;
    let percentegesChangedAgainstOneCcy = [];
    for (let i = 0; i < outCur.length; i++) {
        if (ccy !== outCur[i]) {
            // ex EUR:USD change over time
            let percentageChaingedAgainstOneOutput = getSingeCcyChange(data, outCur[i]);
            percentegesChangedAgainstOneCcy.push(percentageChaingedAgainstOneOutput);
        }
    }
    
    let res = [];
    let numOfCcy = percentegesChangedAgainstOneCcy.length;
    let numOfRecords = percentegesChangedAgainstOneCcy[0].length;

    for (let i = 0; i < numOfRecords; i++) {
        let sumOfPercentageChangedAcrossCcy = 0;
        for (let j = 0; j < numOfCcy; j++) {
            sumOfPercentageChangedAcrossCcy += percentegesChangedAgainstOneCcy[j][i];
        }
        res.push(sumOfPercentageChangedAcrossCcy);
    }

    let breakpoint = 0;
    return {
        'rates': res,
        'inpCur': ccy,
        'outputCur': 'notapl'
    }
}

const process = (data, outCur) => {
    let dataSets = [];
    for (let i = 0; i < data.length; i++) {
        //one base vs all
        let itemData = data[i];
        let dataSetForCcy = buildDataSetForCcy(itemData, outCur)
        dataSets.push(dataSetForCcy);
    }
    return dataSets;
}

module.exports = {
    process
}
