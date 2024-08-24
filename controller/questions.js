const Question = require('../models/question');
const Option =require('../models/option');
module.exports= class questionController{

    //TO CREATE A NEW QUESTION
    async createQuestion (req, res){
    try {
      const { title } = req.body;
      const question = new Question({ title });
      await question.save();
      res.json(question);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  //TO DELETE A QUESTION
  async deleteQuestion(req, res){
    try {
      const questionId = req.params.id;
      const options = await Option.find({ question_id: questionId });
  
      if (options.some(o => o.votes > 0)) {
        return res.status(400).send('Cannot delete question with voted options.');
      }
  
      await Question.findByIdAndDelete(questionId);
      res.json({ message: 'Question deleted successfully' });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  //TO VIEW A QUESTION
  async showQuestion(req, res){
    try {
      const questionId = req.params.id;
      const question = await Question.findById(questionId);
      if (!question) return res.status(404).send('Question not found.');
  
      const options = await Option.find({ question_id: questionId });
      const optionsWithVotes = options.map(o => ({
        id: o._id,
        text: o.text,
        votes: o.votes,
        link_to_vote: `http://localhost:8000/options/${o._id}/add_vote`
      }));
  
      res.json({
        id: question._id,
        title: question.title,
        options: optionsWithVotes
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}