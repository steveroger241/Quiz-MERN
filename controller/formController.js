const formModel = require('../models/formModel.js');
const comboModel = require('../models/comboModel.js');

async function postController(req, res) {
    try {
        let user = await comboModel.findOne({ email: req.body.email });

        if (user) {
            if (!req.body.heading) {
                return res.send({
                    success: false,
                    error: "Heading is necessary"
                });
            }
            if (!req.body.data) {
                return res.send({
                    success: false,
                    error: "Data is necessary"
                });
            }
            // Though send stringified data from frontend but still parsed here automatically
            // console.log("Till here: ", req.body.data);
            // console.log("=========================================================================");
            // console.log("And there: ", JSON.stringify(req.body.data));
            let dtaa = JSON.stringify(req.body.data)
            let form = await formModel.create({ heading: req.body.heading, data: dtaa });
            let combo = await comboModel.updateOne({ email: req.body.email }, { $push: { data: form._id } });
            if (form && combo) {
                return res.send({
                    success: true,
                    message: "Data uploaded successfully"
                })
            }
        }
        else {
            return res.send({
                success: false,
                error: "Login is required"
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.send({
            success: false,
            error: "Internal server error from backend in uploading form"
        })
    }
}

async function getAllController(req, res) {
    try {
        // console.log('Here');
        let result = await comboModel
            .findOne({ email: req.body.email })
            .populate({ path: 'data', options: { sort: { createdAt: -1 } } });
        // console.log(result);
        if (result) {
            return res.send({
                success: true,
                message: "Data fetch scuccessfull",
                result
            })
        }
    }
    catch (err) {
        return res.send({
            success: false,
            error: "Internal server error from backend in fetching form data"
        })
    }
}

async function getOneController(req, res) {
    try {
        let result = await formModel.findOne({ _id: req.body.id })

        // console.log(result);

        if (result) {
            return res.send({
                success: true,
                message: "Data fetch successfull",
                result
            })
        }
    }
    catch (err) {
        return res.send({
            success: false,
            error: "Internal server error from backend in fetching form data"
        })
    }
}

async function deleteController(req, res) {
    try {
        let form = await formModel.deleteOne({ _id: req.body.id });
        let combo = await comboModel.updateOne({ email: req.body.email }, { $pull: { data: req.body.id } });

        if (form && combo) {
            return res.send({
                success: true,
                message: "Deletion successfull"
            });
        }
        else {
            return res.send({
                success: false,
                error: "Unable to delete"
            });
        }
    }
    catch (err) {
        return res.send({
            success: false,
            error: "Internal server error from backend in deleting form"
        })
    }
}

module.exports = { postController, getAllController, getOneController, deleteController }