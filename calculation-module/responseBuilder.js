
const stratUtils = require('./strategies/stratUtils')

const curencyPairAcquirer = require('./dataAcquires/currencyPairsAcquirer');
const curencyPairStrategy = require('./strategies/currencyPairs')

const curencyStrengthAcquirer = require('./dataAcquires/currencyStrengthAcquirer');
const curencyStrengthStrategy = require('./strategies/currencyStrength')

const getCurrencyStrenghtData = async (startDate, endDate, out) => {
    let data = await curencyStrengthAcquirer.getData(startDate, endDate, out);
    let datasets = curencyStrengthStrategy.process(data, out);
    let labels = stratUtils.getLabels(data[0]);

    return {
        datasets,
        labels
    }
}


const getCurrencyPairData = async (startDate, endDate, inp, out) => {

    let data = await curencyPairAcquirer.getData(startDate, endDate, inp);
    let datasets = curencyPairStrategy.process(data, out);
    let labels = stratUtils.getLabels(data);

    return {
        datasets,
        labels
    }

}



const getCurrencyPercentageSumData = (startDate, endDate, inp, out) => {



}

module.exports = {
    getCurrencyPairData,
    getCurrencyStrenghtData,
    getCurrencyPercentageSumData
}