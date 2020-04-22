const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/SellerController');



router
  .post('/', sellerController.insertSeller)
  .get('/', sellerController.getSeller)
  .get('/:sellerId', sellerController.detailSeller)
  .put('/:sellerId', sellerController.updateSeller)
  .delete('/:sellerId', sellerController.deleteSeller)









module.exports = router;
