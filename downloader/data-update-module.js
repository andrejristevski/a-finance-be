const dataDownloader = require('./dataDownloader');
const config = require('../config');

if (config.downloadData) {
    dataDownloader.startDownloadingInterval()
}

module.exports = {};