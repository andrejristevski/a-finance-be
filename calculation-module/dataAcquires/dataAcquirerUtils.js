
const config = require('../../config');

const getConfigForCurency = (currency) => {

    for (let i = 0; i < config.currencies.length; i++) {
        let currencyConfig = config.currencies[i];
        if (currencyConfig.currency === currency) {
            return currencyConfig;
        }

    }
}

module.exports = {
    getConfigForCurency
}