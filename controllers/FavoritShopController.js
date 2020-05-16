const favoritShop = require('../models').favorit_shop;
const helpers = require('../helpers/response');


module.exports = {
  insertFavoritShop: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await favoritShop.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'Favorit Shop Has Been Created';
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

  getFavoritShop: (async(req,res) => {
    let response = {};
    try {
      const data = await favoritShop.findAll({});
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Favorite Shop List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Favorite Shop all list!';
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

  detailFavoritShop: (async(req,res) => {
    let response = {};
    try {
      favoritId = req.params.favoritId;

      const data = await favoritShop.findOne({
        where: {
          id: favoritId,
        },
      });

      if (!data) {
        response.status = 404;
        response.message = 'Favorit Shop Detail not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Favorit Shop Detail list!';
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

  updateFavoritSpoh: (async(req, res) => {
    let response = {};
    try {
      const favoritId = req.params.favoritId;
      const body = req.body;

      const [edit] = await favoritShop.update(body, {
        where: {
          id: favoritId,
        },
      });
      const data = await favoritShop.findOne({
        where: {
          id: favoritId,
        },
      });

      if (edit === 1) {
        response.status = 201;
        response.message = 'Favorit Shop Successfully Edited';
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

  deleteFavoritShop: (async(req, res) => {
    let response = {};
    try {
      const favoritId = req.params.favoritId;
      const data = await favoritShop.destroy({
        where: {
          id: favoritId,
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