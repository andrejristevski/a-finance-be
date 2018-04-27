const responseBuilder = require('../../calculation-module/responseBuilder');

const getPerformanceData = async (req, res, next) => {

    const response = await responseBuilder.getPerformanceDataForUser(req.user)
    res.status(200).send(response)

}

module.exports = {
    getPerformanceData
}