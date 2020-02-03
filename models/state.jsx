var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var statesSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    CID: mongoose.Schema.Types.ObjectId
}, { timestamps: true });
module.exports = mongoose.model('states', statesSchema);
