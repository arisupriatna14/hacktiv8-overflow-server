const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  register: (req, res) => {
    const { username, email, password, imageUrl } = req.body

    User
      .create({ username, email, password, imageUrl })
      .then(result => {
        res.status(201).json({
          message: "Register success",
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          errorRegister: err
        })
      })
  },

  login: (req, res) => {
    const { email, password } = req.body

    User
      .findOne({ email: email })
      .then(result => {
        const passwordFromDB = result.password
        bcrypt
          .compare(password, passwordFromDB)
          .then((isPassword) => {
            if (isPassword) {
              const token = jwt.sign({
                id: result._id,
                email: result.email
              }, process.env.JWT_SECRET_KEY)
              res.status(200).json({
                message: 'Login success',
                token: token
              })
            } else {
              res.status(401).json({
                message: "Password wrong"
              })
            }
          })
          .catch(err => {
            res.status(500).json({
              errorCompare: err
            })
          })
      })
      .catch(err => {
        res.status(500).json({
          errorLogin: err
        })
      })
  }
}