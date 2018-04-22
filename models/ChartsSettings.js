const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChartsSettingsChart = new Schema({
    startDate: {
        // required: true,
        type: Date
    },
    endDate: {
        // required: true,
        type: Date
    },
    inp: {
        // required: true,
        type: String
    },
    out: {
        // required: true,
        type: [String]
    },
    type: {
        // required: true,
        type: String
    },
    id: {
        type: String
    }
});

const ChartsSettings = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    chartsSettings: {
        type: [ChartsSettingsChart]
    }
})

module.exports = mongoose.model('ChartsSettings', ChartsSettings)