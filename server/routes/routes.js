const express = require('express')
const router = express.Router()
const passport = require('passport');

const testCtrl = require('../controllers/testCtrl');
const ratesController = require('../controllers/ratesController');
const authController = require('../controllers/authController');
const exchangeController = require('../controllers/exchangeController');
const exchangeRoutes = require('./exchangeRoutes');

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

router.get('/alive', testCtrl.testRoute)

router.post('/rates',  ratesController.rates)
router.post('/strength', passport.authenticate('jwt', { session: false }), ratesController.strenght)
router.post('/percentagesum', passport.authenticate('jwt', { session: false }), ratesController.percentagesum)

router.post('/signup', authController.signup)
router.post('/login', passport.authenticate('local', { session: false }), authController.login)


router.post('/exchanges', passport.authenticate('jwt', { session: false }), exchangeController.saveExchange)
router.get('/exchanges', passport.authenticate('jwt', { session: false }), exchangeController.getExchanges)



module.exports = router
