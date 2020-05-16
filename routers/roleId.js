const express = require('express');
const router = express.Router();
const roleIdController = require('../controllers/RoleIdController');



router
  .post('/', roleIdController.insertRole)
  .get('/', roleIdController.getRole)
  .get('/:roleId', roleIdController.detailRole)
  .put('/:roleId', roleIdController.updateRole)
  .delete('/:roleId', roleIdController.deleteRole)











module.exports = router;