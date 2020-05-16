const express = require('express');
const router = express.Router();
const bankController = require('../controllers/BankController');


router
  .post('/', bankController.insertBank)
  .get('/', bankController.getBank)
  .get('/:bankId', bankController.detailBank)
  .put('/:bankId', bankController.updateBank)
  .delete('/:bankId', bankController.deleteBank)



module.exports = router;