const status = require('../models').status;
const helpers = require('../helpers/response');

module.exports = {
  insertStatus: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await status.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'OK';
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

  getStatus: (async(req, res) => {
    let response = {};
    try {
      const data = await status.findAll({});
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Status List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Data Semua Status!';
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

  detailStatus: (async(req, res) => {
    let response = {};
    try {
      statusId = req.params.statusId;

      const data = await status.findOne({
        where: {
          id: statusId,
        },
      });

      if (!data) {
        response.status = 404;
        response.message = 'User Detail not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Data Detail Status!';
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

  updateStatus: (async(req, res) => {
    let response = {};
    try {
      const statusId = req.params.statusId;
      const body = req.body;

      const [edit] = await status.update(body, {
        where: {
          id: statusId,
        },
      });

      const data = await status.findOne({
        where: {
          id: statusId,
        },
      });
      if (edit === 1) {
        response.status = 201;
        response.message = 'User Successfully Edited';
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

  deleteStatus: (async(req, res) => {
    let response = {};
    try {
      const statusId = req.params.statusId;
      const data = await status.destroy({
        where: {
          id: statusId,
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