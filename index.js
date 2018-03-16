
// https://medium.com/the-node-js-collection/why-the-hell-would-you-use-node-js-4b053b94ab8e da se procita ubo
// const request = require('request');
// const dataDownloader = require('./dataDownloader');
// const databaseService = require('./databaseService')


require("dotenv").config();
const server = require('./server/server')
require('./downloader/data-update-module')


// let mongoose =require('mongoose')
// mongoose.connect(dbUrl)
// var conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'connection error:'));


// var MongoClient = require('mongodb').MongoClient;
// var uri = process.env.CONNECTION_STRING;

// MongoClient.connect(uri, function (err, client) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`connection established`);
//     try {
//       databaseService.setDbclient(client);
//       dataDownloader.startDownloadingInterval();
//     } catch (e) {
//       console.log(`${e}`);
//     }
//   }
// });

// function fja() {
// 
//   function getProm(ms) {
//     return new Promise(res => {
//       setTimeout(() => {
//         console.log(`resolving after ${ms}`);
//         res()
//       }, ms);
//     })
//   }
// 
//   async function afja() {
//     let a = await getProm(500);
//     let b = await getProm(300);
//     let c = await getProm(10000);
//   }

//   afja();

// }

// fja();