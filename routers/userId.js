const express = require('express');
const router = express.Router();
const userIdController = require('../controllers/UserIdController');



router
  .post('/register', userIdController.insertUser)
  .post('/login', userIdController.loginUser)
  .get('/', userIdController.getUser)
  .get('/auth/', userIdController.authUser)
  .get('/:userId', userIdController.detailUser)
  .put('/:userId', userIdController.updateUser)
  .patch('/resetpassword/', userIdController.resetPassword)
  .delete('/:userId', userIdController.deleteUser)


  module.exports = router;