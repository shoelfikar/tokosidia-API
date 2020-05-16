const address = require('../models').address;
const helpers = require('../helpers/response');


module.exports = {
  insertAddress: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await address.create(body);
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

  getAddress: (async(req, res) => {
    let response = {};
    try {
      const data = await address.findAll({});
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Address List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Data All Address!';
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

  detailAddress: (async(req, res) => {
    let response = {};
    try {
      addressId = req.params.addressId;

      const data = await address.findOne({
        where: {
          id: addressId,
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

  updateAddress: (async(req, res) => {
    let response = {};
    try {
      const addressId = req.params.addressId;
      const body = req.body;

      const [edit] = await address.update(body, {
        where: {
          id: addressId,
        },
      });
      const data = await address.findOne({
        where: {
          id:addressId,
        },
      });

      if (edit === 1) {
        response.status = 200;
        response.message = 'Address Successfully Edited';
        response.data = data;
        helpers.helpers(res, response);
      }
      if( edit === 0) {
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

  deleteAddress: (async( req, res) => {
    let response = {};
    try {
      const addressId = req.params.addressId;
      const data = await address.destroy({
        where: {
          id: addressId,
        },
      });

      if(data) {
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