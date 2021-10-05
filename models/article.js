const { Schema, model } = require('mongoose')
const Joi = require('joi')

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    maxlength: 255,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  img: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  }
},
  { timestamps: true })

exports.validate = function joi(article) {
  const schema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().max(255).required(),
    body: Joi.string().required(),
    category: Joi.string().required(),
    img: Joi.string()
  })
  return schema.validate(article)
}

exports.Article = model('articles', articleSchema)
