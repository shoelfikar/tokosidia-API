const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');


router
  .post ('/', categoryController.insertCategory)
  .get('/', categoryController.getCategory)
  .get('/:categoryId', categoryController.detailCategory)
  .put('/:categoryId', categoryController.updateCategory)
  .delete('/:categoryId', categoryController.deleteCategory)

module.exports = router;