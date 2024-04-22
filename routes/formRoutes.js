const express = require('express');
const { postController, getAllController, getOneController, deleteController } = require('../controller/formController');
const { submitController, fetchMarksController } = require('../controller/studentController');
const router = express.Router();

router.post('/postform', postController);
router.post('/getall', getAllController);
router.post('/getone', getOneController);
router.post('/submit', submitController);
router.post('/delete', deleteController)
router.get('/student/:id', fetchMarksController)

module.exports = router;