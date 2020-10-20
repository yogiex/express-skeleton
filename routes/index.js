var express = require('express');
var router = express.Router();
var dataModel = require('../models/model')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const data = await dataModel.find({})
  await res.render('index', { 
    title: 'Express',
    users: data 
  });
});

module.exports = router;
