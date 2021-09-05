const path = require('path')
const multer = require('multer')
const { v2: cloudinary } = require('cloudinary')
require('dotenv').config()

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
})

exports.upload = multer({ storage: storage })
exports.cloudinary = cloudinary
