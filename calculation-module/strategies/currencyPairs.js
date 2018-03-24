const utils = require('./stratUtils')

const buildDataSet = (data, outputCurency) => {
    let values = utils.getSingleRatesForCur(data, outputCurency)
    return {
        'rates': values,
        'inpCur': data[0].base,
        'outputCur': outputCurency
    }
}

const process = (data, outCur) => {
    let dataSets = [];
    for (let i = 0; i < outCur.length; i++) {
        let item = outCur[i];
        let dataSet = buildDataSet(data, outCur[i])
        dataSets.push(dataSet);
    }
    return dataSets;
}

module.exports = {
    process
}