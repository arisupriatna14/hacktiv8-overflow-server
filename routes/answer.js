const express = require('express');
const router = express.Router();
const { 
  addAnswer,
  getAnswerByIdQuestion
} = require('../controllers/answer');
const { auth } = require('../helpers/auth');

router
  .post('/', auth, addAnswer)
  .get('/:questionId', auth, getAnswerByIdQuestion)

module.exports = router;