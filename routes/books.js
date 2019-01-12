var express = require('express');
var router = express.Router();

/* GET shows full list of books. */
router.get('/', function(req, res, next) {
  res.render('books');
});

module.exports = router;