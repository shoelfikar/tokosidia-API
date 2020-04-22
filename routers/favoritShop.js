const express = require('express');
const router = express.Router();
const favoritController = require('../controllers/FavoritShopController');




router
  .post('/', favoritController.insertFavoritShop)
  .get('/', favoritController.getFavoritShop)
  .get('/:favoritId', favoritController.detailFavoritShop)
  .put('/:favoritId', favoritController.updateFavoritSpoh)
  .delete('/:favoritId', favoritController.deleteFavoritShop)


module.exports = router;