
// https://medium.com/the-node-js-collection/why-the-hell-would-you-use-node-js-4b053b94ab8e da se procita ubo

require("dotenv").config();

require('./server/server')

require('./data-layer/database');

// require('./downloader/data-update-module')

// let mongoose =require('mongoose')
// mongoose.connect(dbUrl)
// var conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'connection error:'));


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