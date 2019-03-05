const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taxModel = new Schema({
    municipality: { type: String },
    dateStart: { type: Date },
    dateEnd: { type: Date },
    taxAmount: { type: Number }
});

module.exports = mongoose.model('taxes', taxModel);
