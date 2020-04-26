const cart = require('../models').cart;
const helpers = require('../helpers/response');

module.exports = {
  insertCart : (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await cart.create(body);
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

  getCart: (async(req, res) => {
    let response = {};
    try {
      const data = await cart.findAll({
      });
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Cart List not Found!';
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

  detailCart : (async(req, res) => {
    let response = {};
    try {
      const cartId = req.params.cartId;
      const data = await cart.findOne({
        where: {
          id:cartId,
        },
      });
      if (!data) {
        response.status = 404;
        response.message = 'Cart Detail not Found!';
        helpers.helpers(res, response);    
      } else {
        response.status = 200;
        response.message = 'OK!';
        response.data = data;
        helpers.helpers(res, response);
      }
    } catch(err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;
      helpers.helpers(res, response);
    }
  }),
  updateCart: (async(req, res) => {
    let response = {};
    try {
      const cartId = req.params.cartId;
      const body = req.body;
      const [edit] = await cart.update(body, {
        where: {
          id: cartId,
        }
      });

      const data = await cart.findOne({
        where: {
          id: cartId,
        },
      });

      if (edit === 1) {
        response.status = 201;
        response.message = 'Category Successfully Edited';
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

  deleteCart: (async(req, res) => {
    let response = {};
    try {
      const cartId = req.params.cartId;
      const data = await cart.destroy({
        where: {
          id: cartId,
        },
      });
      if (!data) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } if (data) {
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
