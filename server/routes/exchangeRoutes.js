const express = require('express')
    , router = express.Router()
const exchangeController = require('../controllers/exchangeController');


router.post('/', function (req, res) {
    exchangeController.saveExchange(req.body)
})

// Car models page
router.get('/b', function (req, res) {
    res.send('Audi Q7, BMW X5, Mercedes GL')
})

module.exports = router