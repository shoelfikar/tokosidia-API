const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/WishlistController');



router
  .post('/', wishlistController.insertWishlist)
  .get('/', wishlistController.getWishlist)
  .get('/:wishlistId', wishlistController.detailWishlist)
  .put('/:wishlistId', wishlistController.updateWishlist)
  .delete('/:wishlistId', wishlistController.deleteWishlist)


  module.exports = router;