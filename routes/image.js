const express = require('express')
const router = express.Router()
const images = require('../helpers/image')

router
  .post('/', 
    images.multer.single('image'),
    images.sendUploadToGCS,
    (req, res) => {
      res.send({
        status: 201,
        message: 'Your file successfully uploaded',
        link: req.file.cloudStoragePublicUrl
      })
    }
  )

module.exports = router