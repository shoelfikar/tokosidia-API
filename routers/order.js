const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const { verify } = require('../helpers/auth');


router
  .post ('/', verify, orderController.insertOrder)
  .get('/', orderController.getOrder)
  .get('/:orderId', orderController.detailOrder)
  .put('/:orderId', orderController.updateOrder)
  .delete('/:orderId', orderController.deleteOrder)

module.exports = router;