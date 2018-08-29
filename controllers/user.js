const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const CronJob = require('cron').CronJob
const nodemailer = require('nodemailer')

module.exports = {
  register: (req, res) => {
    console.log(req.body)
    const { username, email,  imageUrl, password } = req.body

    User
      .create({ username, email,  imageUrl, password })
      .then(result => {

        let transporter = nodemailer.createTransport({
          service: 'GMAIL',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        })

        new CronJob('* * * * *', function() {
          let mailOptions = {
            from: "COMPANYEMAIL@gmail.com",
            to: `${result.email}`,
            subject: `Register Overflow 🚀`,
            text: `Hi ${result.username}, thanks for joining us.`
          };
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              throw error;
            } else {
              console.log("Email successfully sent!");
            }
          });
        }, null, true, 'Asia/Jakarta')

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
                email: result.email,
                imageUrl: result.imageUrl
              }, process.env.JWT_SECRET_KEY)
              res.status(200).json({
                message: 'Login success',
                token: token,
                userId: result._id,
                imageUrl: result.imageUrl
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
  },

  loginOauth: (req, res) => {
    const { username, email, imageUrl } = req.body

    User
      .findOne({ email: email })
      .then((result) => {
        if (result) {
          console.log('masuk if login oauth =>', result)
          const token = jwt.sign({
            id: result._id,
            email: result.email,
            imageUrl: result.imageUrl
          }, process.env.JWT_SECRET_KEY)
          res.status(200).json({
            message: "Login with oAuth2 success",
            token: token,
            userId: result._id
          })
        } else {
          console.log('masuk else login =>', result)
          User
            .create({ username, email, imageUrl })
            .then((result) => {
              const token = jwt.sign({
                id: result._id,
                email: result.email,
                imageUrl: result.imageUrl
              }, process.env.JWT_SECRET_KEY)
              res.status(200).json({
                message: "Login with oAuth2 success",
                token: token
              })
            })
            .catch((err) => {
              res.status(500).json({
                messageErr: err.message
              })
            })
        }
      })
      .catch((err) => {
        res.status(500).json({
          messageErr: err.message
        })
      })
  }
}