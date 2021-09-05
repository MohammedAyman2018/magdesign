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
  category: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: ''
    }],
    default: []
  },
  img: {
    type: String,
    required: true
  }
},
  { timestamps: true })

exports.validate = function joi(article) {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    category: Joi.array(),
    img: Joi.string()
  })
  return schema.validate(article)
}

exports.Article = model('articles', articleSchema)
