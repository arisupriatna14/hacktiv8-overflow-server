const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
  answer: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }
})

module.exports = mongoose.model('Answer', answerSchema)