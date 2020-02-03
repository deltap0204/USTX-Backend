
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TokenByDate = new Schema({

    Buy: Number,
    Sell: Number
}, { timestamps: true });

module.exports = mongoose.model('TokenByDate', TokenByDate);
