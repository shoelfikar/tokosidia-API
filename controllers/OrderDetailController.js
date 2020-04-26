const orderDetail = require('../models').order_detail;
const helpers = require('../helpers/response');

module.exports = {
  insertOrderDetail: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await orderDetail.create(body);
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
  getOrderDetail: (async(req, res) => {
    let response = {};
    try {
      const data = await orderDetail.findAll({});
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Order Detail not Found!';
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
  detailOrderDetail: (async(req, res) => {
    let response = {};
    try {
      const orderDetailId = req.params.orderDetailId;
      const data = await orderDetail.findOne({
        where: {
          id: orderDetailId,
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
  updateOrderDetail: (async(req, res) => {
    let response = {};
    try {
      const orderDetailId = req.params.orderDetailId;
      const body = req.body;

      const [edit] = await orderDetail.update(body, {
        where: {
          id: orderDetailId,
        },
      });

      const data = await orderDetail.findOne({
        where: {
          id: orderDetailId,
        },
      });

      if (edit === 0) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      }
      if (edit === 1){
        response.status = 201;
        response.message = 'Order Successfully Edited';
        response.data = data;
        helpers.helpers(res, response);
      }
    } catch (err) {
      response.status = 500;
      response.message = 'Internal Server Error';
      helpers.helpers(res, response);
    }
  }),
  deleteOrderDetail: (async(req, res) => {
    let response = {};
    try {
      const orderDetailId = req.params.orderDetailId;
      const data = await orderDetail.destroy({
        where: {
          id: orderDetailId,
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
    } catch(err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;
      helpers.helpers(res, response);
    }
  })
}