const express = require('express');
const router = express.Router();
const subSubCategoryController = require('../controllers/SubSubCategoryController');


router
  .post ('/', subSubCategoryController.insertsubSubCategory)
  .get('/', subSubCategoryController.getsubSubCategory)
  .get('/:subSubCategoryId', subSubCategoryController.detailsubSubCategory)
  .put('/:subSubCategoryId', subSubCategoryController.updatesubSubCategory)
  .delete('/:subSubCategoryId', subSubCategoryController.deletesubSubCategory)

module.exports = router;