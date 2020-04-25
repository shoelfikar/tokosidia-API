const express = require('express');
const router = express.Router();
const userIdController = require('../controllers/UserIdController');
const { upload } = require('../helpers/upload');



router
  .post('/register', upload.single('user_image'), userIdController.insertUser)
  .post('/login', userIdController.loginUser)
  .get('/', userIdController.getUser)
  .get('/:userId', userIdController.detailUser)
  .put('/:userId', userIdController.updateUser)
  .delete('/:userId', userIdController.deleteUser)


  module.exports = router;