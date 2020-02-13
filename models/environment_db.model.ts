const mongoose = require('mongoose');
const { Schema } = mongoose;

const environmentdbSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    scheduleHour: String,
    scheduleMinutes: String,
    scheduleUtc: String
}, { timestamps: true });

module.exports = mongoose.model('environmentDB', environmentdbSchema);
