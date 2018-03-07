let config = {
    'dbName': 'proba',
    'restApiRatesUrl': 'https://api.fixer.io/',
    'ratesCollection': "rates",
    'connectionString': 'somecon string',
    'logDates': true,
    'currencies':
        [
            {
                'metadataCollection': 'metaDatatest',
                'ratesCollection': "ratestest",
                'dbName': 'proba',
                'currency': 'EUR'
            },
        ]

}

module.exports = config