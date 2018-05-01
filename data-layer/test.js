
const dataUtils = require('./dataUtils');
let config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://andrej:dwahvio@ds135069.mlab.com:35069/rates';


MongoClient.connect(uri, function (err, client) {
    if (err) {
        console.log(err);
    } else {
        console.log(`connection established`);
        try {
            console.log('setting database client');
            dataUtils.setDbclient(client);

            // for (let curencyConfig of config.currencies) {
                
            //     dataUtils.removeolder(curencyConfig)

            // }

            dataUtils.addMkdCollection(config.currencies[0]);

        } catch (e) {
            console.log(`${e}`);
        }
    }
});