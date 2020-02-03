var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var token_priceSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    price: String,
}, { timestamps: true });
module.exports = mongoose.model('token_price', token_priceSchema);
