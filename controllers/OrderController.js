const order = require('../models').order;
const OrderDetail = require('../models').order_detail;
const helpers = require('../helpers/response');
const cart = require('../models').cart;

module.exports = {
  insertOrder: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const { products } = req.body
      const data = await order.create({
        user_id: req.user_id,
        invoice: body.invoice,
        shipment: body.shipment,
        total: body.total,
        payment: body.payment
      });
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        let productDetail = [];
        console.log(products);
        
        products.forEach(async (product) => {
            await OrderDetail.create({
              order_id: data.id,
              product_id: product.product_id,
              product_quantity: product.quantity,
            });
            await cart.destroy({
              where: {
                user_id: req.user_id,
                product_id: product.product_id
              }
            })
            
        });
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
