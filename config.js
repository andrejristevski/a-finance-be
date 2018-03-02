export default {
    'dbName': 'rates',
    'restApiRatesUrl': 'https://api.fixer.io/',
    'ratesCollection': "rates",
    'connectionString': 'somecon string',
    'currencies':
        [{
            'metadataCollection': 'metaData',
            'ratesCollection': "rates",
            'dbName': 'rates',
            'currency': 'EUR'
        },
        {
            'metadataCollection': 'metaDataUSD',
            'ratesCollection': "ratesUSD",
            'dbName': 'rates',
            'currency': 'USD',
        },
        {
            'metadataCollection': 'metaDataAUD',
            'ratesCollection': "ratesAUD",
            'dbName': 'rates',
            'currency': 'AUD',
        },
        {
            'metadataCollection': 'metaDataCAD',
            'ratesCollection': "ratesCAD",
            'dbName': 'rates',
            'currency': 'CAD',
        },
        {
            'metadataCollection': 'metaDataJPY',
            'ratesCollection': "ratesJPY",
            'dbName': 'rates',
            'currency': 'JPY',
        },
        {
            'metadataCollection': 'metaDataCNY',
            'ratesCollection': "ratesCNY",
            'dbName': 'rates',
            'currency': 'CNY',
        },
        ]

}