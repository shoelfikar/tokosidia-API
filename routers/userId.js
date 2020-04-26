const express = require('express');
const router = express.Router();
const userIdController = require('../controllers/UserIdController');
const { upload } = require('../helpers/upload');



router
  .post('/register',userIdController.insertUser)
  .post('/login', userIdController.loginUser)
  .get('/', userIdController.getUser)
  .get('/auth/', userIdController.authUser)
  .get('/:userId', userIdController.detailUser)
  .patch('/:userId',upload.single('image'), userIdController.updateUser)
  .patch('/resetpassword/:userId', userIdController.resetPassword)
  .delete('/:userId', userIdController.deleteUser)


  module.exports = router;