const express = require('express');
const router =express.Router();
const bankAccountController = require('../controllers/BankAccountController');



router
  .post('/', bankAccountController.insertBankAccount)
  .get('/', bankAccountController.getBankAccount)
  .get('/:accountId', bankAccountController.detailBankAccount)
  .put('/:accountId', bankAccountController.updateBankAccount)
  .delete('/:accountId', bankAccountController.deleteBankAccount)






module.exports = router;