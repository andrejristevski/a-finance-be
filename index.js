

const request = require('request');
const dataDownloader = require('./dataDownloader');
const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

app.get('/alive', function (req, res) {
    res.send('It lives')
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    dataDownloader.startDownloadingInterval()
});


