const express = require('express');
const router = express.Router();
const { 
  addQuestion, 
  updateDownVote, 
  updateUpVote,
  getAllQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/question');
const { auth } = require('../helpers/auth');

router
  .post('/', auth, addQuestion)
  .put('/downvote', auth, updateDownVote)
  .put('/upvote', auth, updateUpVote)
  .get('/', getAllQuestion)
  .put('/:questionId', auth, updateQuestion)
  .delete('/:questionId', auth, deleteQuestion)

module.exports = router;