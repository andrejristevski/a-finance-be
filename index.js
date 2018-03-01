require('dotenv').config()
import dataDownloader from './dataDownloader';

import express from 'express'
const app = express();
app.get('/', function (req, res) {
    res.send('Hello World!')
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});


for (let i in [1, 2, 3]) {
    dataDownloader.downloadMissingData(i);
}
