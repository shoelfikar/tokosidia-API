const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload } = require('../helpers/upload');



router
  .post('/',upload.array('product_image', 5), productController.insertProduct)
  .get('/', productController.getProduct)
  .get('/:productId', productController.detailProduct)
  .put('/:productId', productController.updateProduct)
  .delete('/:productId', productController.deleteProduct)



module.exports = router;