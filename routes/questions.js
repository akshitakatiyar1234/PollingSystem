const express = require('express');
const router = express.Router();

const questionController = require('../controller/questions.js');
// Create a question
const qcontroller =new questionController();
router.post('/create',qcontroller.createQuestion);

// Delete a question
router.delete('/:id/delete', qcontroller.deleteQuestion);

// View a question and its options
router.get('/:id',qcontroller.showQuestion);

module.exports = router;
