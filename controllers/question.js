const Question = require('../models/question')

module.exports = {
  addQuestion: (req, res) => {
    const { 
      title, 
      question,
      tags 
    } = req.body
    const tagsSplit = tags.split(' ')
    const userId = req.user

    Question
      .create({
        title: title,
        question: question,
        user: userId,
        downVote: [],
        upVote: [],
        tags: tagsSplit 
      })
      .then((result) => {
        res.status(201).json({
          message: "Add question success",
          result
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message
        })
      })
  },

  getAllQuestion: (req, res) => {
    Question
      .find({})
      .then((result) => {
        res.status(200).json({
          message: "Get all question success",
          result
        })
      })
      .catch((err) => {
        res.status(500).json({
          errMessage: err.message
        })
      })
  },

  updateDownVote: (req, res) => {
    const { downVote } = req.body
    const { questionid } = req.headers

    Question
      .findById({ _id: questionid })
      .then((result) => {
        console.log()
        if (result.downVote.includes(downVote)) {
          res.status(403).json({
            message: 'Tidak bisa down vote lagi cuyy'
          })
        } else {
          Question
            .findByIdAndUpdate(
              {
                _id: questionid 
              },
              { 
                $push: { downVote: downVote }
              }
            )
            .then((result) => {
              res.status(200).json({
                message: "Downvote success",
                result
              })
            })
            .catch((err) => {
              res.status(500).json({
                errMessage: err.message
              })
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateUpVote: (req, res) => {
    const { upVote } = req.body
    const { questionid } = req.headers

    Question
      .findById({ _id: questionid })
      .then((result) => {
        if (result.upVote.includes(upVote)) {
          res.status(403).json({
            message: 'Tidak bisa up vote lagi cuyy'
          })
        } else {
          Question
            .findByIdAndUpdate(
              {
                _id: questionid 
              },
              { 
                $push: { upVote: upVote }
              }
            )
            .then((result) => {
              res.status(200).json({
                message: "Downvote success",
                result
              })
            })
            .catch((err) => {
              res.status(500).json({
                errMessage: err.message
              })
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateQuestion: (req, res) => {
    const { title, question } = req.body
    const { questionId } = req.params
    const userId = req.user

    Question
      .findOne({ user: userId })
      .then((result) => {
        if (result) {
          Question
            .findOneAndUpdate({ 
              _id: questionId, 
            }, {
              $set: {
                title: title,
                question: question
              }
            })
            .then((result) => {
              res.status(201).json({
                message: "Update question success",
                result
              })
            })
            .catch((err) => {
              res.status(500).json({
                messageErr: err.message
              })
            })
        } else {
          res.status(401).json({
            message: "Authorization failed"
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err
        })
      })
  },

  deleteQuestion: (req, res) => {
    const { questionId } = req.params
    const userId = req.user

    Question
      .findOne({ user: userId })
      .then((result) => {
        if (result) {
          Question
            .deleteOne({ _id: questionId })
            .then((result) => {
              res.status(200).json({
                message: "Delete question success",
                result
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: err.message
              })
            })
        } else {
          res.status(401).json({
            message: "Authorization failed"
          })
        }
      })
  }
}