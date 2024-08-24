const Option = require('../models/option');
const Question = require('../models/question');

module.exports = class questionController{

    //TO CREATE AN OPTION
    async createOption (req, res) {
        try {
          const questionId = req.params.id;
          const { text } = req.body;
      
          const question = await Question.findById(questionId);
          if (!question) return res.status(404).send('Question not found.');
      
          const option = new Option({ question_id: questionId, text });
          await option.save();
          res.json(option);
        } catch (err) {
          res.status(400).send(err.message);
        }
      }
    
    // TO DELETE AN OPTION
    async deleteOption(req, res) {
        try {
          const optionId = req.params.id;
          const option = await Option.findById(optionId);
      
          if (option.votes > 0) return res.status(400).send('Cannot delete option with votes.');
      
          await Option.findByIdAndDelete(optionId);
          res.json({ message: 'Option deleted successfully' });
        } catch (err) {
          res.status(400).send(err.message);
        }
      }

    //TO VOTE FOR AN OPTION
    async voteOption(req, res){
        try {
          const optionId = req.params.id;
          const option = await Option.findById(optionId);
          if (!option) return res.status(404).send('Option not found.');
      
          option.votes += 1;
          await option.save();
          res.json(option);
        } catch (err) {
          res.status(400).send(err.message);
        }
      }
}