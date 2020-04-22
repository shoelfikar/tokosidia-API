const express = require('express');

const router = express.Router();
const userId = require('./userId');
const seller = require('./seller');
const address = require('./address');
<<<<<<< HEAD
const roleId = require('./roleId');
=======
const product = require('./product');
>>>>>>> 4527c68f6045d0f3f89c3115e7703cc5ee0c3af5

router
  .use('/user', userId)
  .use('/seller', seller)
  .use('/address', address)
<<<<<<< HEAD
  .use('/role', roleId)
=======
  .use('/product', product)
>>>>>>> 4527c68f6045d0f3f89c3115e7703cc5ee0c3af5
  .get('/', function(req,res) {
    res.send({
      message: 'Welcome to Tokodidia API',
      about: 'TOKOSIDIA-WEB APP v1',
      author: 'Tokosidia Team',
      thanks: 'Thanks to visit our API'
    })
  })

module.exports = router;