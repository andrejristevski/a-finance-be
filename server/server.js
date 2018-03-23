const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', routes);

app.listen(5000, function () {
    console.log('Example app listening on port 5000!')
});