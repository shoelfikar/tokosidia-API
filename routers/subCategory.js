const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/SubCategoryController');


router
  .post ('/', subcategoryController.insertsubCategory)
  .get('/', subcategoryController.getsubCategory)
  .get('/:subCategoryId', subcategoryController.detailsubCategory)
  .put('/:subCategoryId', subcategoryController.updatesubCategory)
  .delete('/:subCategoryId', subcategoryController.deletesubCategory)

module.exports = router;