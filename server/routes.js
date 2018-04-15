const express = require('express')
const router = express.Router()

const testCtrl = require('./controllers/testCtrl');
const ratesController = require('./controllers/ratesController');
const authController = require('./controllers/authController');
const passport = require('passport');

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

router.get('/alive', testCtrl.testRoute)

router.post('/rates', passport.authenticate('jwt', {session: false}), ratesController.rates)
router.post('/strength', passport.authenticate('jwt', {session: false}), ratesController.strenght)
router.post('/percentagesum', passport.authenticate('jwt', {session: false}), ratesController.percentagesum)

router.post('/signup', authController.signup)
router.post('/login', passport.authenticate('local', { session: false }), authController.login)

module.exports = router
