const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');



router
  .post('/', productController.insertProduct)
  .get('/', productController.getProduct)
  .get('/:productId', productController.detailProduct)
  .put('/:productId', productController.updateProduct)
  .delete('/:productId', productController.deleteProduct)



module.exports = router;