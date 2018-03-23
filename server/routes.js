const express = require('express')
const router = express.Router()
const testCtrl = require('./controllers/testCtrl');
const ratesController = require('./controllers/ratesController')

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

router.get('/alive', testCtrl.testRoute)

router.post('/rates', ratesController.rates)
router.post('/strenght', ratesController.strenght)
router.post('/percentagesum', ratesController.percentagesum)

module.exports = router