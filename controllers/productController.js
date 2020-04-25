const { product, image} = require('../models');
const helpers = require('../helpers/response');

module.exports = {
  insertProduct : (async(req, res) => {
    let response = {};
    const { files } = req;
    try {
      const body = req.body;
      const data = await product.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        files.forEach(file => {
          image.create({
            product_id: data.id,
            image: file.path
          });
        });
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
      const data = await product.findAll({});
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