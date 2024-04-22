const studentModel = require("../models/studentModel.js")

async function submitController(req, res) {
    try {
        if (!req.body.email || !req.body.marks || !req.body.id) {
            return res.send({
                success: false,
                error: "All fields are required"
            })
        }

        let result = await studentModel.create({
            email: req.body.email, marks: req.body.marks, quizname: req.body.id
        });

        if (result) {
            return res.send({
                success: true,
                message: "Successfully collected your response"
            });
        }
    }
    catch (err) {
        return res.send({
            success: false,
            error: "Internal server error from backend in submitting student form"
        })
    }
}

async function fetchMarksController(req, res) {
    try {
        let result = await studentModel
            .find({ quizname: req.params.id })
            .sort({ createdAt: -1 });

        if (result) {
            return res.send({
                success: true,
                message: "Data fetch successfull",
                result
            });
        }
    }
    catch (err) {
        return res.send({
            success: false,
            error: "Internal server error from backend in fetching student data"
        })
    }
}

module.exports = { submitController, fetchMarksController };