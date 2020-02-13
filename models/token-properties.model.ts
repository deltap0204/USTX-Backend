const mongoose = require('mongoose');
const {Schema} = mongoose;

const TokenPropertiesSchema = new Schema({
    tokenTotal: Number,
    tokenStartTime: Number,
    fundInterest: Number,
    intialShareValue: Number,
    intialPreFundValue: Number,
    intialEndingFundValue: Number,
    depositFeeRate: Number,
}, {timestamps: true});

module.exports = mongoose.model('token_properties', TokenPropertiesSchema);

