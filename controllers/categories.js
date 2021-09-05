const { Category } = require("../models/category")

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
    return res.status(200).json(categories)
  } catch (err) {
    res.status(400).json({ message: err.message, err })
  }
}

exports.addCategory = async (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ msg: 'Name is required.' }) 
  else {
    try {
      const category = await Category.create({ name })
    } catch (err) {
      res.status(400).json({ message: err.message, err })
    }
  }
}

exports.deleteAllCategories = async (req, res) => {
  Category.deleteMany({})
    .then(_ => res.status(201).json({ message: 'deleted successfully' }))
    .catch(err => res.status(500).json({ message: err.message, err }))

}

exports.getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)

    res.status(200).json(category)
  } catch (err) {
    res.status(500).json({ message: err.message, err })
  }
}

exports.updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (!category) { return res.status(400).send('There is no category with this id.') }

  category.name = req.body.name
  await category.save()
  return res.status(201).json(category)
}

exports.deleteOneCategory = async (req, res) => {
  Category.findOneAndDelete({ _id: req.params.id })
    .then(category => res.status(201).json({ message: 'deleted successfully' }))
    .catch(err => res.status(500).json({ message: err.message, err }))

}
