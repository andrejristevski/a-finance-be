const databaseService = require('./databaseService');

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.CONNECTION_STRING;

MongoClient.connect(uri, function (err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log(`connection established`);
    try {
      console.log('setting database client');
      databaseService.setDbclient(client);
      require('../downloader/data-update-module')
    } catch (e) {
      console.log(`${e}`);
    }
  }
});
