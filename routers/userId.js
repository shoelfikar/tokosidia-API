const express = require('express');
const router = express.Router();
const userIdController = require('../controllers/UserIdController');



router
  .post('/register', userIdController.insertUser)
  .get('/', userIdController.getUser)
  .get('/:userId', userIdController.detailUser)
  .put('/:userId', userIdController.updateUser)
  .delete('/:userId', userIdController.deleteUser)


  module.exports = router;