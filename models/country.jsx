var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var countrySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
}, { timestamps: true });
module.exports = mongoose.model('countries', countrySchema);
