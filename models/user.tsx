const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    mobileNo: String,
    email: {type: String, unique: true, index: true},
    DOB: String,
    SSN: String,
    usCity: Boolean,
    tokenAmount: {type: Number, default: 0},
    address: {
        country: String,
        AddressLine1: String,
        AddressLine2: String,
        city: String,
        state: String,
        zipCode: String
    },
    password: String,
    Active: Boolean,
    confirmation_tokken: String,
    reset_pass_confirmation_tokken: String,
    sumSubVerified: {type: Boolean, default: false}


}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
