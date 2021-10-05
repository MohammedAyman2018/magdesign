var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/article/:title', function(req, res, next) {
  res.render('related.jade');
});

// Admin Routes
router.get('/admin/login', function (req, res, next) {
  res.render('admin/login.jade')
})

router.get('/admin/articles', function (req, res, next) {
  res.render('admin/articles/index.jade')
})

router.get('/admin/articles/add', function (req, res, next) {
  res.render('admin/articles/add.jade')
})

router.get('/admin/articles/edit/:id', async function (req, res, next) {
  res.render('admin/articles/edit.jade')
})

router.get('/admin/categories', function (req, res, next) {
  res.render('admin/categories/index.jade')
})


module.exports = router;
