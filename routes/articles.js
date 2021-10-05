var express = require('express');
var router = express.Router();
const { upload } = require('../middlewares/upload')

const { 
  getAllArticles,
  addArticle,
  updateArticle,
  changeArticleImg,
  increaseArticleViews,
  getArticlesForIndexPage,
  getOneArticle,
  deleteOneArticle,
  deleteAllArticles
} = require('../controllers/articles')

router
  .route('/')
  .get(getAllArticles) // => ✅
  .post(upload.single('article-img'), addArticle) // => ✅
  .delete(deleteAllArticles)
  
router
  .route('/:id')
  .get(getOneArticle) // => ✅
  .patch(updateArticle) // => ✅
  .delete(deleteOneArticle) // => ✅

router.patch('/change-img/:id', upload.single('article-img'), changeArticleImg) // => ✅
router.patch('/views/:id', increaseArticleViews) // => ✅
router.get('/index/all', getArticlesForIndexPage)
module.exports = router;
