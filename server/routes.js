const express = require('express')
const router = express.Router()

const testCtrl = require('./controllers/testCtrl');
const ratesController = require('./controllers/ratesController');
const authController = require('./controllers/authController');


router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

router.get('/alive', testCtrl.testRoute)

router.post('/rates', ratesController.rates)
router.post('/strength', ratesController.strenght)
router.post('/percentagesum', ratesController.percentagesum)

router.post('/signup', authController.signup)
router.get('/signup', authController.signup)


module.exports = router
