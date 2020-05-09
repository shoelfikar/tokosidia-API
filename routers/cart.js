const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const { verify } = require('../helpers/auth');


router
  .post ('/', verify, cartController.insertCart)
  .get('/', verify, cartController.getCart)
  .get('/:cartId', cartController.detailCart)
  .put('/:cartId', cartController.updateCart)
  .delete('/:cartId', cartController.deleteCart)

module.exports = router;