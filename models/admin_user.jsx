var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var admin_userSchema = new Schema({
    Name: String,
    Password: String,
    BuyAmount: Number,
    SellAmount: Number,
    UserCount: Number,
    TokenPrice: Number
}, { timestamps: true });
module.exports = mongoose.model('AdminModel', admin_userSchema);
