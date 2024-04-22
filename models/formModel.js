const mongoose = require('../config/db.js');

const formSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    data: { type: String, required: true }
}, { timestamps: true });

const formModel = mongoose.model('fmodel', formSchema);

module.exports = formModel;