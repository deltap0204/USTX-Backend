const mongoose = require('mongoose');
const { Schema } = mongoose;
const TransactionSchema = new Schema({
    UserId: String,
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
    Bank: {
        Name: String,
        BankAccountType: String,
        BankRoutingNumber: String,
        BankName: String,
        BankAccountNumber: String,
        BankType: String
    },
    SellConfirmed: Boolean
}, { timestamps: true });
module.exports = mongoose.model('Transaction', TransactionSchema);
