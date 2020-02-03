var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TokenByDate = new Schema({
    Buy: Number,
    Sell: Number
}, { timestamps: true });
module.exports = mongoose.model('TokenByDate', TokenByDate);
