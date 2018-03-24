
const stratUtils = require('./strategies/stratUtils')

const curencyPairAcquirer = require('./dataAcquires/currencyPairsAcquirer');
const curencyPairStrategy = require('./strategies/currencyPairs')

const getCurrencyPairData = async (startDate, endDate, inp, out) => {

    let data = await curencyPairAcquirer.getData(startDate, endDate, inp);
    let datasets = curencyPairStrategy.process(data, out);
    let labels = stratUtils.getLabels(data);

    let breakpoint = 0;
    return {
        datasets,
        labels
    }

}

const getCurrencyStrenghtData = (startDate, endDate, inp, out) => {



}

const getCurrencyPercentageSumData = (startDate, endDate, inp, out) => {



}

module.exports = {
    getCurrencyPairData,
    getCurrencyStrenghtData,
    getCurrencyPercentageSumData
}