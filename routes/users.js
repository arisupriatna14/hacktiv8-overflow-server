const express = require('express');
const router = express.Router();
const { register, login, loginOauth } = require('../controllers/user');

router
  .post('/register', register)
  .post('/login', login)
  .post('/login/oauth', loginOauth)


module.exports = router;
