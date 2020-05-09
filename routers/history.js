const express = require('express');
const router = express.Router();
const historyController = require('../controllers/HistoryController');


router
  // .post('/', historyController.insertHistory)
  .get('/', historyController.getHistory)
  // .get('/:historyId', historyController.detailHistory)
  // .put('/:historyId', historyController.updateHistory)
  // .delete('/:historyId', historyController.deleteHistory)



module.exports = router;