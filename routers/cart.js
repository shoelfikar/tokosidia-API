const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');


router
  .post ('/', cartController.insertCart)
  .get('/', cartController.getCart)
  .get('/:cartId', cartController.detailCart)
  .put('/:cartId', cartController.updateCart)
  .delete('/:cartId', cartController.deleteCart)

module.exports = router;