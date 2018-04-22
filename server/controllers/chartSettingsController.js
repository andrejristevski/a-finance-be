const express = require('express')
    , router = express.Router()
const ChartsSettingsModel = require('../../models/ChartsSettings')


const getChartsSettings = (req, res) => {

    ChartsSettingsModel.findById(req.user._id, (err, result) => {
        if (err) {
            res.status(400).send()
        }
        res.status(200).send(result)
    });
}

const saveChartsSettings = (req, res, next) => {

    ChartsSettingsModel.findByIdAndUpdate(req.user._id,
        { $set: { userId: req.user._id, chartsSettings: req.body } }, { upsert: true }, (err, result) => {
            if (err) {
                console.log('charts settings error');
                res.status(400).send('Ch error')
            }
        })

    res.status(200).send()
}

module.exports = {
    saveChartsSettings,
    getChartsSettings,
}