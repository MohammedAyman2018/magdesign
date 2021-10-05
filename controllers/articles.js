const { Article, validate } = require("../models/article")
const { Category } = require("../models/category")
const { cloudinary } = require('../middlewares/upload')

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).populate('category')
    return res.status(200).json(articles)
  } catch (err) {
    res.status(400).json({ message: err.message, err })
  }
}

exports.addArticle = async (req, res) => {
  const { title, body, category } = req.body

  try {
    let article = await Article.findOne({ title: req.body.title })
    if (article) {
      return res.status(400).send('This article already existing.')
    }

    if (!req.file) return res.status(400).json('You should add image')
    const { error } = validate(req.body)
    if (error) { return res.status(400).json({ message: `There is something wrong: ${error.details[0].message}`, error }) }


    article = { title, body, category }

    await cloudinary.uploader.upload(req.file.path,
      { resource_type: 'auto', folder: 'mo-blog' },
      async function (error, result) {
        /** Uploaded? */
        if (error) return res.status(400).json(error)
        /** Create the new product */
        article.img = result.secure_url

        /** Save the new product */
        article = await Article.create(article)
        return res.status(200).json(article)
      })


  } catch (err) {
    res.status(400).json({ message: err.message, err })
  }
}

exports.updateArticle = async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article) { return res.status(400).send('There is no article with this id.') }
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      const element = req.body[key];
      article[key] = element
    }
  }
  
  await article.save()
  return res.status(201).json(article)
}

exports.changeArticleImg = async (req, res) => {
  const article = await Article.findById(req.params.id)
  if (!article) {
    return res.status(400).send('There is no article with this Id')
  }

  if (req.file) {
    await cloudinary.uploader.upload(req.file.path,
      { resource_type: 'auto', folder: 'mo-blog' },
      async function (error, result) {
        /** Uploaded? */
        if (error) return res.status(400).json(error)
        /** Create the new product */
        if (article && result) article.img = result.secure_url

        /** Save the new product */
        await article?.save()
          .then(article => res.status(201).json(article))
          .catch((err) => res.status(400).json({ message: err.message, err }))
      })
  }
}

exports.deleteAllArticles = async (req, res) => {
  Article.deleteMany({})
    .then(_ => res.status(201).json({ message: 'deleted successfully' }))
    .catch(err => res.status(500).json({ message: err.message, err }))
}

exports.deleteOneArticle = async (req, res) => {
  Article.findOneAndDelete({ _id: req.params.id })
    .then(article => res.status(201).json({ message: 'deleted successfully' }))
    .catch(err => res.status(500).json({ message: err.message, err }))
}

exports.getOneArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)

    res.status(200).json(article)
  } catch (err) {
    res.status(500).json({ message: err.message, err })
  }
}


exports.increaseArticleViews = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    article.views++
    await article.save()

    res.status(200).json(article)
  } catch (err) {
    res.status(500).json({ message: err.message, err })
  }
}

exports.getArticlesForIndexPage = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: 1 }).populate('category')
    
    const articlesToShow = {
      leatest: articles.slice(0, 5),
      articles: articles.length > 5 ? articles.slice(5) : articles,
      categories: await Category.find()
    }
  
    res.status(200).json(articlesToShow)
  } catch (err) {
    res.staus(500).json(err)
  }
}
