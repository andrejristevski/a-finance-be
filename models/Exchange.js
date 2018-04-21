const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExchangeSchema = new Schema({
    inputCcy: {
        required: true,
        type: String
    },
    outCcy: {
        type: String,
        required: true,
    },
    exchangeRate: {
        type: Number,
        required: true,
    },
    sum: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    }
})


module.exports = mongoose.model('Exchange', ExchangeSchema)