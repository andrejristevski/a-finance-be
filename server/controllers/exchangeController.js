const ExchangeModel = require('../../models/Exchange')

const getExchanges = (req, res) => {

    ExchangeModel.find({ userId: req.user._id }, (err, result) => {
        if (err) {
            res.status(400).send()
        }
        res.status(200).send(result)
    });
}

const saveExchange = (req, res, next) => {
    const exchangeBody = {
        sum: req.body.sum,
        exchangeRate: req.body.exchangeRate,
        inputCcy: req.body.inputCcy,
        outCcy: req.body.outCcy,
        date: req.body.date,
        userId: req.user._id
    };

    ExchangeModel.create(exchangeBody, function (err, small) {
        if (err) {
            res.status(400).send()
        }
        console.log('Exchange saved');
    })
    res.status(200).send()
}

module.exports = {
    saveExchange,
    getExchanges,
}