
const mongoose = require('mongoose');
const { Schema } = mongoose;

const token_priceSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    price: String,



}, { timestamps: true });

module.exports = mongoose.model('token_price', token_priceSchema);
