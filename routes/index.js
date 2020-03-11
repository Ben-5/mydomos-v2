var express = require('express');
var router = express.Router();

var connect = require('../models/connection')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Domos' });
});


module.exports = router;
