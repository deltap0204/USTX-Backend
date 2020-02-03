const mongoose = require('mongoose');
const { Schema } = mongoose;
const sellSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    UID: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    address: String,
    nameOncard: String,
    USDAmmount: Number,
    USTXAmount: Number,
    bank: {
        routingNumber: String,
        accountNumber: String,
        bankAddress: String,
    },
    success: Boolean
}, { timestamps: true });
module.exports = mongoose.model('sell', sellSchema);
