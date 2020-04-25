const product = require('../models').product;
const category = require('../models').category;
const subCategory = require('../models').subCategory;
const subSubCategory = require('../models').subSubCategory;
const seller = require('../models').seller;
const users = require('../models').user_id;
const helpers = require('../helpers/response');

module.exports = {
  insertProduct : (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await product.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 201;
        response.message = 'Product Has Been Created';
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
  getProduct: (async(req,res) => {
    let response = {};   
    try {   
      const data = await product.findAll({
        include: [
      //     {
      //     model: category,
      //     as: 'categoryName',
      //     attributes: ['name']
      // },
        // {
      //     model: subCategory,
      //     as: 'subCategoryName',
      //     attributes: ['name'],
      // },  
      // {
      //   model: subSubCategory,
      //   as: 'subSubCategoryName',
      //   attributes: ['name'],
      // }, 
      // {
      //   model: seller,
      //   as:'seller',
      //   attributes: ['name', 'address']
      // },
       {
        model: users,
        as:'users',
        attributes: ['fullname', 'email', 'phone_number']}
      ]
      });
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Product not Found!';
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
  detailProduct : (async(req, res) => {
    let response = {}
    try {
      const productId = req.params.productId;
      const data = await product.findOne ({
        where: {
          id: productId,
        },
      });
      if (!data) {
        response.status = 404;
        response.message = 'Product not Found!';
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
  updateProduct : (async(req,res) => {
    let response = {};
    try {
      const productId = req.params.productId;
      const body = req.body;

      const [edit] = await product.update(body,
        {where: {
          id: productId,
        },
      });

      const data = await product.findOne({
        where: {
          id: productId
        },
      });

      if (edit === 1) {
        response.status = 201;
        response.message = 'Product Successfully Edited';
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
  deleteProduct: (async(req, res) => {
    let response = {};
    try {
      const productId = req.params.productId;
      const data = await product.destroy({
        where: {
          id: productId
        },
      });
      
      if (data) {
        response.status = 200;
        response.message = 'Product Successfully Deleted';
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