const express = require('express');
const { authController } = require('../controller/userController');
const router = express.Router();

router.post('/login', authController);

module.exports = router;