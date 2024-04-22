const comboModel = require('../models/comboModel.js');

async function authController(req, res) {
    try {
        let finduser = await comboModel.findOne({ email: req.body.email });

        if (finduser) {
            return res.send({
                success: true,
                message: "Login successfull"
            })
        }

        let combo = await comboModel.create({ email: req.body.email, data: [] });

        if (combo) {
            return res.send({
                success: true,
                message: "Registration successfull"
            })
        }
    }
    catch (err) {
        return res.send({
            success: false,
            error: "Internal server error in login via backend"
        })
    }
}

module.exports = { authController }