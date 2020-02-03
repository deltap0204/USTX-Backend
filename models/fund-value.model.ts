const mongoose = require('mongoose');
const {Schema} = mongoose;

const FundValueSchema = new Schema({
    preAdjustmentValue: Number,
    endingFundValue: Number,
    startTime: {type: Date},
    endTime: {type: Date},
}, {timestamps: true});

module.exports = mongoose.model('fund_value', FundValueSchema);
