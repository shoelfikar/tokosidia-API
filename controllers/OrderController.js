const order = require('../models').order;
const helpers = require('../helpers/response');

module.exports = {
  insertOrder: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await order.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'Create Success!';
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
  getOrder: (async(req, res) => {
    let response = {};
    try {
      const data = await order.findAll({});
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Order List not Found!';
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
  detailOrder: (async(req, res) => {
    let response = {};
    try {
      const orderId = req.params.orderId;
      const data = await order.findOne({
        where: {
          id: orderId,
        },
      });
      if (!data) {
        response.status = 404;
        response.message = 'Address Detail not Found!';
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
  updateOrder: (async(req, res) => {
    let response = {};
    try {
      const orderId = req.params.orderId;
      const body = req.body;

      const [edit] = await order.update(body, {
        where: {
          id: orderId,
        },
      });

      const data = await order.findOne({
        where: {
          id: orderId,
        },
      });

      if (edit === 1) {
        response.status = 201;
        response.message = 'Order Successfully Edited';
        response.data = data;
        helpers.helpers(res, response);
      } if (edit === 0) {
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
  deleteOrder: (async(req, res) => {
    let response = {};
    try {
      const orderId = req.params.orderId;
      const data = await order.destroy({
        where: {
          id: orderId,
        },
      });
      if (!data) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'Successfully Deleted';
        helpers.helpers(res, response);
      }
    } catch (err){
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;
      helpers.helpers(res, response);
    }
  })
}
