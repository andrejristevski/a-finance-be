const express = require('express')
const router = express.Router()
const testCtrl =  require('./controllers/testCtrl');

router.get('/alive', testCtrl.testRoute)

module.exports = router