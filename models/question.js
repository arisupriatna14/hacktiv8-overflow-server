const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  question: {
    type: String,
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  downVote: [],
  upVote: [],
  tags: []
})

module.exports = mongoose.model('Question', questionSchema);