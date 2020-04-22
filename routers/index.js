const express = require('express');

const router = express.Router();
const userId = require('./userId');
const seller = require('./seller');
const address = require('./address');
const roleId = require('./roleId');
const product = require('./product');
const status = require('./status');

router
  .use('/user', userId)
  .use('/seller', seller)
  .use('/address', address)
  .use('/role', roleId)
  .use('/product', product)
  .use('/status', status)
  .get('/', function(req,res) {
    res.send({
      message: 'Welcome to Tokodidia API',
      about: 'TOKOSIDIA-WEB APP v1',
      author: 'Tokosidia Team',
      thanks: 'Thanks to visit our API'
    })
  })

module.exports = router;