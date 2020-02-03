
const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,



}, { timestamps: true });

module.exports = mongoose.model('countries', countrySchema);
