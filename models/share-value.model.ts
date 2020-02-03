const mongoose = require('mongoose');
const {Schema} = mongoose;

const ShareValueSchema = new Schema({
    price: Number,
    startTime: {type: Date},
    endTime: {type: Date},
    interest: Number
}, {timestamps: true});

module.exports = mongoose.model('share_value', ShareValueSchema);
