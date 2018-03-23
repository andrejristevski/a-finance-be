const responseBuilder = require('../../lib/responseBuilder');

const getBodyProperties = (req) => {
    startDate = req.body['startDate']
    endDate = req.body['endDate']
    inpCur = req.body['inp']
    outCur = req.body['out']
    return {
        startDate,
        endDate,
        inpCur,
        outCur
    }
}


const rates = (req, res, next) => {
    ({
        startDate,
        endDate,
        inpCur,
        outCur
    } = getBodyProperties(req));
    responseBuilder.getCurrencyPairData(startDate, endDate, inpCur, outCur)
    next()
}


const strenght = (req, res, next) => {
    ({
        startDate,
        endDate,
        inpCur,
        outCur
    } = getBodyProperties(req));

    next()
}


const percentagesum = (req, res, next) => {
    ({
        startDate,
        endDate,
        inpCur,
        outCur
    } = getBodyProperties(req));

    next()
}

module.exports = {
    rates,
    strenght,
    percentagesum
}