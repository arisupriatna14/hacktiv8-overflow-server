const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  auth: (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization.split('Bearer ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
    User
      .findById({ _id: decoded.id })
      .then((result) => {
        req.user = result._id
        next()
      })
      .catch((err) => {
        res.status(401).json({
          message: "Anda tidak memiliki autentikasi!"
        })
      })
  }
}