// const product = require('../models').product;
// const category = require('../models').category;
// const subCategory = require('../models').subCategory;
// const subSubCategory = require('../models').subSubCategory;
// const user_id = require ('../models').user_id;
const { product, imageDetail, category, subCategory,
  subSubCategory, user_id, condition, seller} = require('../models');
const helpers = require('../helpers/response');

module.exports = {
  insertProduct : (async(req, res) => {
    let response = {};
    const { files } = req;
    try {
      const input = req.body;
      // input.image = `http://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
      console.log('here')
      // input.image = `http://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
      const data = await product.create(input);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        files.forEach(file => {
          const url = `http://${req.get('host')}/${file.path.replace(/\\/g, '/')}`;
          console.log(url);
          imageDetail.create({
            product_id: data.id,
            image: url
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
    let pagination = {};
    try {
      let param = {};
      let searchParam = {};
      const { sort } = req.query;
      const page = parseInt(req.query.page, 10) || 1;
      const setLimit = parseInt(req.query.limit, 10) || 2;
      const offset = null;
      const setOffset = (page * setLimit) - setLimit;
      const limit = setLimit + setOffset;
      const path = `http://192.168.1.84${req.baseUrl}?page`;
      const { search } = req.query;
      const include = [
        {
          model: user_id,
          as: 'username',
          attributes: ['fullname'],
        }, {
          model: category,
          as: 'categoryName',
          attributes: ['name']
        }, {
          model: subCategory,
          as: 'subCategoryName',
          attributes: ['name'],
        }, {
          model: subSubCategory,
          as: 'subSubCategoryName',
          attributes: ['name'],
        }, {
          model: imageDetail,
          as: 'images',
          attributes: ['image'],
        },
        {
          model: condition,
          as: 'kondisi_barang',
          attributes: ['status'],
        },
        {
          model: seller,
          as: 'toko',
          attributes: ['name', 'address'],
        }
      ];
      let sortType = req.query.sort_type || '';
      sortType = sortType.toUpperCase() || 'ASC';
      if (sort !== undefined) {
        param.order = [[sort, sortType]];
      }
      param.offset = offset;
      param.limit = limit;
      param.include = include;
      if (search !== undefined) {
        const where = {
          [Op.or]: [
            { title: { [Op.substring]: search } },
          ],
        };
        console.log('here');
        param.where = where;
        searchParam = { where };
      }
      const data = await product.findAll(param);
      const count = await product.count(searchParam);
      pagination = {
        current_page: page,
        offset,
        limit,
        total_data: count,
        per_page: data.length,
        path,
      };
      if (data.length === 0) {
        pagination.status = 404;
        pagination.message = 'Product not Found!';
        helpers.pagination(res, req.query, pagination);
      } else {
        pagination.status = 200;
        pagination.message = 'OK!';
        pagination.data = data;
        helpers.pagination(res, req.query, pagination);
      }
    } catch (err) {
      pagination = {};
      pagination.status = 500;
      pagination.message = 'Internal Server Error';
      pagination.err = err;
      helpers.pagination(res, req.query, pagination);
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
        include: [
          {
            model: imageDetail,
            as: 'images',
            attributes: ['image'],
          }
        ]
        // include: [
        //   {model: user_id, as:'users', attributes: ['email', 'fullname'], include: [
        //     {model: address, as: 'addresses', attributes:['address', 'phone_number']},
        //     {model: seller, as:'store', attributes: ['name', 'address']}
        //   ]},
        //   {model: seller, as:'seller', attributes: ['name', 'address'],}
        // ]
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