const Question = require('../models/question')

module.exports = {
  addQuestion: (req, res) => {
    console.log('kiriman dari client ==>',req.body)
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
        console.log('berhasil add question')
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
      .populate('user')
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
    const { userId } = req.body
    const { questionid } = req.headers

    Question
      .findById({ _id: questionid })
      .then((result) => {
        console.log()
        if (result.downVote.includes(userId)) {
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
                $push: { downVote: userId }
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
    const { userId } = req.body
    const { questionid } = req.headers

    console.log('ini req headers =>', req.headers)
    console.log('ini req body', req.body)
    Question
      .findById({ _id: questionid })
      .then((result) => {
        if (result.upVote.includes(userId)) {
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
                $push: { upVote: userId }
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
      .findOneAndUpdate(
        { 
          $and: [
            {
              _id: questionId, 
            }, 
            {
              user: userId 
            }
          ]
        },
        {
          $set: {
            title: title,
            question: question
          }
        }
      )
      .then((result) => {
        if (result) {
          res.status(201).json({
            message: "Update question success",
            result
          })
        } else {
          res.status(401).json({
            message: "Authorization failed"
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          messageErr: err.message
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