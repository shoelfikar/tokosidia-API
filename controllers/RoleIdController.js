const role_id = require('../models/').role_id;
const helpers = require('../helpers/response');



module.exports = {
  insertRole: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await role_id.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'Success Create!';
        response.data = data;
        helpers.helpers(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;
      helpers.helpers(res, response);
    }

  }),

  getRole: (async(req, res) => {
    let response = {};
    try {
      const data = await role_id.findAll({});
      if (data.length === 0) {
        response.status = 404;
        response.message = 'RoleId List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Data All RoleId!';
        response.data = data;
        helpers.helpers(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;
      helpers.helpers(res, response);
    }
  }),

  detailRole: (async(req, res) => {
    let response = {};
    try {
      roleId = req.params.roleId;

      const data = await role_id.findOne({
        where: {
          id: roleId,
        },
      });

      if (!data) {
        response.status = 404;
        response.message = 'RoleId Detail not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'OK!';
        response.data = data;
        helpers.helpers(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;
      helpers.helpers(res, response);
    }
  }),

  updateRole: (async(req, res) => {
    let response = {};
    try {
      const roleId = req.params.roleId;
      const body = req.body;

      const [edit] = await role_id.update(body, {
        where: {
          id: roleId,
        },
      });
      const data = await role_id.findOne({
        where: {
          id: roleId
        }
      })

      if (edit === 1) {
        response.status = 200;
        response.message = 'Address Successfully Edited';
        response.data = data;
        helpers.helpers(res, response);
      } 
      if (edit === 0) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      }
    } catch (err) {
      response.status = 500;
      response.message = 'Internal Server Error';
      helpers.helpers(res, response);
    }
  }),

  deleteRole: (async(req,res) => {
    let response = {};
    try {
      const roleId = req.params.roleId;
      const data = await role_id.destroy({
        where: {
          id: roleId,
        },
      });

      if (data) {
        response.status = 200;
        response.message = 'Successfully Deleted';
        helpers.helpers(res, response);
      } else {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;
      helpers.helpers(res, response);
    }
  })
}