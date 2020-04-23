const subCategory = require('../models').subCategory;
const subSubCategory = require('../models').subSubCategory;
const helpers = require('../helpers/response');

module.exports = {
  insertsubCategory: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await subCategory.create(body);
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

  getsubCategory: (async(req, res) => {
    let response = {};
    try {
      const data = await subCategory.findAll({
        include: {
          model: subSubCategory,
          as: 'SubSubCategory',
          attributes: ['name']
        }
      })
      if (data.length === 0) {
        response.status = 404;
        response.message = 'subCategory List not Found!';
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
  detailsubCategory: (async(req, res) => {
    let response = {};
    try {
      const subCategoryId = req.params.subCategoryId;
      const data = await subCategory.findOne({
        include: {
          model: subSubCategory,
          as: 'SubSubCategory',
          attributes: ['name']
        },
        where: {
          id: subCategoryId,
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
  updatesubCategory: (async(req, res) => {
    let response = {};
    try {
      const subCategoryId = req.params.subCategoryId;
      const body = req.body;

      const [edit] = await subCategory.update(body, {
        where: {
          id: subCategoryId,
        },
      });
      const data = await subCategory.findOne({
        where: {
          id: subCategoryId,
        },
      });
      if (edit === 1) {
        response.status = 201;
        response.message = 'subCategory Successfully Edited';
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
  deletesubCategory: (async(req, res) => {
    let response = {};
    try {
      const subCategoryId = req.params.subCategoryId;
      const data = await subCategory.destroy({
        where: {
          id: subCategoryId,
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