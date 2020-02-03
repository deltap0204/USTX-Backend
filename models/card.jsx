var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var purshaceSchema = new Schema({
    name: String,
    email: String,
    address: String,
    nameOncard: String,
    USDAmmount: Number,
    USTXAmount: Number,
    card: {
        number: String,
        exp_year: String,
        exp_month: String,
        cvc: String
    },
    success: Boolean
}, { timestamps: true });
module.exports = mongoose.model('Purchase', purshaceSchema);
