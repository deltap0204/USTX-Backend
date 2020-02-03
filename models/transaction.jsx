var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TransactionSchema = new Schema({
    Name: String,
    Email: String,
    type: Boolean,
    USTX: String,
    USD: String,
    Unique_ID: String,
    CardName: String,
    CardNum: String,
    EXP: String,
    CVC: String,
    Bank1: String,
    Bank2: String,
    Bank3: String,
    Bank4: String,
    SellConfirmed: Boolean
}, { timestamps: true });
module.exports = mongoose.model('Transaction', TransactionSchema);
