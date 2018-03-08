

const request = require('request');
const dataDownloader = require('./dataDownloader');
const express = require('express')
const bodyParser = require('body-parser')
const databaseService = require('./databaseService')

require("dotenv").config();

// let mongoose =require('mongoose')
// mongoose.connect(dbUrl)
// var conn = mongoose.connection;             
// conn.on('error', console.error.bind(console, 'connection error:'));  

const app = express();
app.use(bodyParser.json())

app.get('/alive', function (req, res) {
  res.send('It lives')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


var MongoClient = require('mongodb').MongoClient;
var uri = process.env.CONNECTION_STRING;
console.log(uri);

MongoClient.connect(uri, function (err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log(`connection established`);
    databaseService.setDbclient(client);
    dataDownloader.startDownloadingInterval();
  }
});