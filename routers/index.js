const express = require('express');

const router = express.Router();
const userId = require('./userId');
const product = require('./product');

router
  .use('/user', userId)
  .use('product', product)
  .get('/', function(req,res) {
    res.send({
      message: 'Welcome to Tokodidia API',
      about: 'TOKOSIDIA-WEB APP v1',
      author: 'Tokosidia Team',
      thanks: 'Thanks to visit our API'
    })
  })

module.exports = router;