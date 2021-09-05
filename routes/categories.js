var express = require('express');
var router = express.Router();

const { 
  getAllCategories,
  addCategory,
  deleteAllCategories,
  getOneCategory,
  updateCategory,
  deleteOneCategory
} = require('../controllers/categories')

router
  .route('/')
  .get(getAllCategories) // => 
  .post(addCategory) // => 
  .delete(deleteAllCategories)
  
router
  .route('/:id')
  .get(getOneCategory) // => 
  .patch(updateCategory) // => 
  .delete(deleteOneCategory) // => 

module.exports = router;
