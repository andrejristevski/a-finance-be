

const getLabels = (data) => {

    let res = [];
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        res.push(item['exactDateStr'])
    }
    return res;
}

/**
 * Returns every value for certain pair ex EUR:USD
 * @param {Array.rates} data 
 */
const getSingleRatesForCur = (data, outCur) => {

    let res = []
    for (let i = 0; i < data.length; i++) {
        res.push(data[i]['rates'][outCur]);
    }
    return res
}


module.exports = {
    getSingleRatesForCur,
    getLabels
}