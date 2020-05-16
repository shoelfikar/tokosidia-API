const express = require('express');
const router = express.Router();
const historyDtlController = require('../controllers/HistoryDetailController');


router
  .post('/', historyDtlController.insertHistoryDtl)
  .get('/', historyDtlController.getHistoryDtl)
  .get('/:detailId', historyDtlController.detailHistoryDtl)
  .put('/:detailId', historyDtlController.updateHistoryDtl)
  .delete('/:detailId', historyDtlController.deleteHistoryDtl)



module.exports = router;