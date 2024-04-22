const mongoose = require('../config/db.js');

const comboSchema = new mongoose.Schema({
    email: { type: String, required: true },
    data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fmodel' }] // Array because in future we'll push different ids to it
}, { timestamps: true });

const comboModel = mongoose.model('cmodel', comboSchema);

module.exports = comboModel;