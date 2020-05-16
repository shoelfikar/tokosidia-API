const wishlist = require('../models').wishlist;
const helpers = require('../helpers/response');

module.exports = {
  insertWishlist: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await wishlist.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'Wishlist Has Been Created';
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

  getWishlist: (async(req,res) => {
    let response = {};
    try {
      const data = await wishlist.findAll({});
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Wishlist List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Wishlist all list!';
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

  detailWishlist: (async(req, res) => {
    let response = {};
    try {
      wishlistId = req.params.wishlistId;

      const data = await wishlist.findOne({
        where: {
          id: wishlistId,
        },
      });

      if (!data) {
        response.status = 404;
        response.message = 'Wishlist Detail not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Wishlist Detail list!';
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

  updateWishlist: (async(req, res) => {
    let response = {};
    try {
      const wishlistId = req.params.wishlistId;
      const body = req.body;

      const [edit] = await wishlist.update(body, {
        where: {
          id: wishlistId,
        },
      });
      const data = await wishlist.findOne({
        where: {
          id: wishlistId,
        },
      });

      if (edit === 1) {
        response.status = 201;
        response.message = 'Wishlist Successfully Edited';
        response.data = data;
        helpers.helpers(res, response);
      } else {
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

  deleteWishlist: (async(req, res) => {
    let response = {};
    try {
      const wishlistId = req.params.wishlistId;
      const data = await wishlist.destroy({
        where: {
          id: wishlistId,
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