

import config from './config';
import dataDownloader from './dataDownloader';

import express from 'express'
const app = express();
app.get('/alive', function (req, res) {
    res.send('It lives')
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
    dataDownloader.startDownloadingInterval()
});


