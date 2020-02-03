

const mongoose = require('mongoose');
const { Schema } = mongoose;

const citiesSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    CID: mongoose.Schema.Types.ObjectId,
    SID: mongoose.Schema.Types.ObjectId,


}, { timestamps: true });

module.exports = mongoose.model('cities', citiesSchema);
