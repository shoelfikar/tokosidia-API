const subSubCategory = require('../models').subSubCategory;
const helpers = require('../helpers/response');

module.exports = {
  insertsubSubCategory: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await subSubCategory.create(body);
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

  getsubSubCategory: (async(req, res) => {
    let response = {};
    try {
      const data = await subSubCategory.findAll({})
      if (data.length === 0) {
        response.status = 404;
        response.message = 'subSubCategory List not Found!';
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
  detailsubSubCategory: (async(req, res) => {
    let response = {};
    try {
      const subSubCategoryId = req.params.subSubCategoryId;
      const data = await subSubCategory.findOne({
        where: {
          id: subSubCategoryId,
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
    };
  }),
  updatesubSubCategory: (async(req, res) => {
    let response = {};
    try {
      const subSubCategoryId = req.params.subSubCategoryId;
      const body = req.body;

      const [edit] = await subSubCategory.update(body, {
        where: {
          id: subSubCategoryId,
        },
      });
      const data = await subSubCategory.findOne({
        where: {
          id: subSubCategoryId,
        },
      });
      if (edit === 1) {
        response.status = 201;
        response.message = 'subSubCategory Successfully Edited';
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
  deletesubSubCategory: (async(req, res) => {
    let response = {};
    try {
      const subSubCategoryId = req.params.subSubCategoryId;
      const data = await subSubCategory.destroy({
        where: {
          id: subSubCategoryId,
        },
      });
      if (!data) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } if(data) {
        response.status = 200;
        response.message = 'Successfully Deleted';
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