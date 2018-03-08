let config = {
    'dbName': 'proba',
    'restApiRatesUrl': 'https://api.fixer.io/',
    'ratesCollection': "rates",
    'connectionString': 'somecon string',
    'logDates': true,
    'delayBetweenCalls': 500,
    'currencies':
        [{
            'metadataCollection': 'metaDataEur',
            'ratesCollection': "ratesEur",
            'dbName': 'rates-prod',
            'currency': 'EUR',
        },
        {
            'metadataCollection': 'metaDataUSD',
            'ratesCollection': "ratesUSD",
            'dbName': 'rates-prod',
            'currency': 'USD',
        },
        {
            'metadataCollection': 'metaDataAUD',
            'ratesCollection': "ratesAUD",
            'dbName': 'rates-prod',
            'currency': 'AUD',
        },
        {
            'metadataCollection': 'metaDataCAD',
            'ratesCollection': "ratesCAD",
            'dbName': 'rates-prod',
            'currency': 'CAD',
        },
        {
            'metadataCollection': 'metaDataJPY',
            'ratesCollection': "ratesJPY",
            'dbName': 'rates-prod',
            'currency': 'JPY',
        },
        {
            'metadataCollection': 'metaDataCNY',
            'ratesCollection': "ratesCNY",
            'dbName': 'rates-prod',
            'currency': 'CNY',
        },
        ]
}

module.exports = config
    // [
    //     {
    //         'metadataCollection': 'metaDatatest',
    //         'ratesCollection': "ratestest",
    //         'dbName': 'proba',
    //         'currency': 'EUR'
    //     },
    // ]