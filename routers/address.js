const express = require('express');
const router = express.Router();
const addressController = require('../controllers/AddressController');



router
  .post('/', addressController.insertAddress)
  .get('/', addressController.getAddress)
  .get('/:addressId', addressController.detailAddress)
  .pus('/:addressId', addressController.updateAddress)








module.exports = router;