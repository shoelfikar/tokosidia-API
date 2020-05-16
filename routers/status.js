const express = require('express');
const router = express.Router();
const statusController = require('../controllers/StatusController');




router
  .post('/', statusController.insertStatus)
  .get('/', statusController.getStatus)
  .get('/:statusId', statusController.detailStatus)
  .put('/:statusId', statusController.updateStatus)
  .delete('/:statusId', statusController.deleteStatus)





module.exports = router;