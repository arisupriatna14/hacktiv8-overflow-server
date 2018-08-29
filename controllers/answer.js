const Answer = require('../models/answer')

module.exports = {
  addAnswer: (req, res) => {
    const { answer, questionId } = req.body
    Answer
      .create({
        answer: answer,
        user: req.user,
        question: questionId,
      })
      .then(result => {
        res.status(201).json({
          message: "Add comment success",
          result: result
        })
      })
      .catch(err => {
        res.status(500).json({
          errorAddComment: err
        })
      })
  },

  getAnswerByIdQuestion: (req, res) => {
    const { questionId } = req.params

    Answer
      .find({ question: questionId })
      .populate('user', 'email')
      .then((result) => {
        res.status(200).json({
          message: 'Get answer success',
          result
        })
      })
      .catch((err) => {
        res.status(500).json({
          messageErr: err
        });
      })
  },

  // updateQuestion: (req, res) => {
  //   const 
  // },
}