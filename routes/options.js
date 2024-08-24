const express = require('express');
const router = express.Router();
const optionController =require('../controller/options.js');

const oController = new optionController();

// Add an option to a question
router.post('/:id/create',oController.createOption);

// Delete an option
router.delete('/:id/delete', oController.deleteOption);

// Add a vote to an option
router.post('/:id/add_vote',oController.voteOption);

module.exports = router;
