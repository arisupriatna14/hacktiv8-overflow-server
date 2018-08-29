const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  auth: (req, res, next) => {
    const { authorization } = req.headers
    console.log('req header =>', req.headers)
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY)
    console.log('masuk then ==>', decoded)
    
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