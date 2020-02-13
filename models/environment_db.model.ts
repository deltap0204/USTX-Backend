const mongoose = require('mongoose');
const { Schema } = mongoose;

const environmentdbSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    scheduleHour: String,
    scheduleMinutes: String,
    scheduleUtc: String,
    tokenTotal: Number,
    tokenStartTime: Number,
    fundInterest: Number,
    intialShareValue: Number,
    intialPreFundValue: Number,
    intialEndingFundValue: Number,
    depositFeeRate: Number
}, { timestamps: true });

module.exports = mongoose.model('environmentDB', environmentdbSchema);
