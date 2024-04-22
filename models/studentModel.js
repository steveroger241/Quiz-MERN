const mongoose = require('../config/db.js');

const studentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    marks: { type: Number, required: true },
    quizname: { type: String, required: true }
}, { timestamps: true })

const studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;