const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/user');
const images = require('../helpers/image')

router
  .post('/register', register)
  .post('/login', login)


module.exports = router;
