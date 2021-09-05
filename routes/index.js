var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/article/:title', function(req, res, next) {
  console.log(req.params.title)
  res.render('related.jade');
});

module.exports = router;
