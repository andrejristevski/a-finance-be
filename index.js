

const request = require('request');
const dataDownloader = require('./dataDownloader');
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://andrej:dwahvio,M@ds135069.mlab.com:35069/rates';

const app = express();
app.use(bodyParser.json())

app.get('/alive', function (req, res) {
    res.send('It lives')
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.error(`Database connection failed ${err}`)
        } else {
            console.log('Connection to db established')
            dataDownloader.startDownloadingInterval()
        }
        // var dbo = db.db("mydb");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        // dbo.collection("customers").insertOne(myobj, function(err, res) {
        //   if (err) throw err;
        //   console.log("1 document inserted");
        //   db.close();
        // });
    });

});


