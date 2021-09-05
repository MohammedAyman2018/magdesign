const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
},
  { timestamps: true })


exports.Category = model('category', categorySchema)
