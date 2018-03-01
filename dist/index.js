'use strict';

var _dataDownloader = require('./dataDownloader');

var _dataDownloader2 = _interopRequireDefault(_dataDownloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();


var express = require('express');
var app = express();

app.get('/', function (req, res) {
    return res.send('Hello World! nodemon');
});

app.listen(3000, function () {
    return console.log('server started');
});

for (var i in [1, 2, 3]) {
    _dataDownloader2.default.downloadMissingData(i);
}