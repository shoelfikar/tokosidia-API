const express = require('express');

const router = express.Router();
const userId = require('./userId');
const seller = require('./seller');
const address = require('./address');
const roleId = require('./roleId');
const product = require('./product');
const status = require('./status');
const bankAccount = require('./bankAccount');
const bank = require('./bank');
const favoritShop = require('./favoritShop');
const wishlist = require('./wishlist');
const history = require('./history');
const historyDetail = require('./historyDetail');
const category = require('./category');
const subCategory = require('./subCategory');
const subSubCategory = require('./subSubCategory');
const order = require('./order');
const orderdetail = require('./orderDetail');
const cart = require('./cart');

router
  .use('/user', userId)
  .use('/seller', seller)
  .use('/address', address)
  .use('/role', roleId)
  .use('/product', product)
  .use('/status', status)
  .use('/bankaccount', bankAccount)
  .use('/bank', bank)
  .use('/favoritshop', favoritShop)
  .use('/wishlist', wishlist)
  .use('/history', history)
  .use('/historydetail', historyDetail)
  .use('/category', category)
  .use('/subcategory', subCategory)
  .use('/subsubcategory', subSubCategory)
  .use('/order', order)
  .use('/orderdetail', orderdetail)
  .use('/cart', cart)
  .get('/', function(req,res) {
    res.send({
      message: 'Welcome to Tokodidia API',
      about: 'TOKOSIDIA-WEB APP v1',
      author: 'Tokosidia Team',
      thanks: 'Thanks to visit our API'
    })
  })

module.exports = router;