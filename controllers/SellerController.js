const seller = require('../models').seller;
const product = require('../models').product;
const user_id = require('../models').user_id;
const helpers = require('../helpers/response');


module.exports = {
  insertSeller: (async(req,res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await seller.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      }else {
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
  getSeller: (async(req,res) => {
    let response = {};
    try {
      const data = await seller.findAll({
        include: [
          {model: product, as: 'myProduct', attributes: ['id', 'name', 'description', 'price', 'stock_product', 'rating', 'weight', 'condition']},
          {model: user_id, as:'store', attributes: ['fullname', 'email']}
        ]
      });
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Seller List not Found!';
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
  detailSeller: (async(req,res) => {
    let response = {};
    try {
      sellerId = req.params.sellerId;

      const data = await seller.findOne({
        where: {
          id: sellerId,
        },
        include: [
          {model: product, as: 'myProduct', attributes: ['id', 'name', 'description', 'price', 'stock_product', 'rating', 'weight', 'condition']},
          {model: user_id, as:'store', attributes: ['fullname', 'email']}
        ]
      });
      
      if (!data) {
        response.status = 404;
        response.message = 'Seller Detail not Found!';
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

  updateSeller: (async(req, res) => {
    let response = {};
    try {
      const sellerId = req.params.sellerId;
      const body = req.body;

      const [edit] = await seller.update(body, {
        where: {
          id: sellerId,
        },
      });
      const data = await seller.findOne({
        where: {
          id: sellerId,
        },
      });

      if (edit === 1) {
        response.status = 201;
        response.message = 'Seller Successfully Edited';
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

  deleteSeller: (async(req,res) => {
    let response = {};
    try {
      const sellerId = req.params.sellerId;
      const data = await seller.destroy({
        where: {
          id: sellerId
        }
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