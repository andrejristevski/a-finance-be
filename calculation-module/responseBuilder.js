
const stratUtils = require('./strategies/stratUtils')

const curencyPairAcquirer = require('./dataAcquires/currencyPairsAcquirer');
const curencyPairStrategy = require('./strategies/currencyPairs')

const curencyStrengthAcquirer = require('./dataAcquires/currencyStrengthAcquirer');
const curencyStrengthStrategy = require('./strategies/currencyStrength')

const userPerformanceAquirer = require('./dataAcquires/userPerformanceAcquirer');
const userPerformanceStrategy = require('./strategies/userPerformance')

const getCurrencyStrenghtData = async (startDate, endDate, out) => {
    let data = await curencyStrengthAcquirer.getData(startDate, endDate, out);
    let datasets = curencyStrengthStrategy.process(data, out);
    let labels = stratUtils.getLabels(data[0]);

    return {
        datasets,
        labels
    }
}

let asd = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
        label: '# of Votes',
        rates: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
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


const getPerformanceDataForUser = async (user) => {

    let data = await userPerformanceAquirer.getData(user);
    let datasets =  userPerformanceStrategy.process(data);
    return asd;
}

module.exports = {
    getCurrencyPairData,
    getCurrencyStrenghtData,
    getPerformanceDataForUser,
}