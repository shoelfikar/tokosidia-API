const category = require('../models').category;
const subCategory = require('../models').subCategory;
const subSubCategory = require('../models').subSubCategory;
const helpers = require('../helpers/response');

module.exports = {
  insertCategory: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await category.create(body);
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

  getCategory: (async(req, res) => {
    let response = {};
    try {
      const data = await category.findAll({
        include: {
          model: subCategory,
          as: 'SubCategory',
          attributes: ['name'],
          include: [{
            model: subSubCategory,
            as: 'SubSubCategory',
            attributes: ['name']
          }],
        }
      })
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Category List not Found!';
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
  detailCategory: (async(req, res) => {
    let response = {};
    try {
      const categoryId = req.params.categoryId;
      const data = await category.findOne({
        where: {
          id: categoryId,
        },
      });
      if (!data) {
        response.status = 404;
        response.message = 'Category Detail not Found!';
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
  updateCategory: (async(req, res) => {
    let response = {};
    try {
      const categoryId = req.params.categoryId;
      const body = req.body;

      const [edit] = await category.update(body, {
        where: {
          id: categoryId,
        },
      });
      const data = await category.findOne({
        where: {
          id: categoryId,
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
  deleteCategory: (async(req, res) => {
    let response = {};
    try {
      const categoryId = req.params.categoryId;
      const data = await category.destroy({
        where: {
          id: categoryId,
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