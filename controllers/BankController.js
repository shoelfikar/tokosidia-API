const bank = require('../models').bank;
const bank_account = require('../models').bank_account;
const helpers = require('../helpers/response');


module.exports = {
  insertBank: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await bank.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'Bank Has Been Created';
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

  getBank: (async(req, res) => {
    let response = {};
    try {
      const data = await bank.findAll({
        include: {
          model: bank_account,
          as: 'bankName',
          attributes: ['account_number', 'account_name']
        }
      });
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Bank  List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'List All Bank!';
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

  detailBank: (async(req, res) => {
    let response = {};
    try {
      bankId = req.params.bankId;

      const data = await bank.findOne({
        where: {
          id: bankId,
        },
      });

      if (!data) {
        response.status = 404;
        response.message = 'Bank  Detail not Found!';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'Detail Bank List!';
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

  updateBank: (async(req,res) => {
    let response = {};
    try {
      const bankId = req.params.bankId;
      const body = req.body;

      const [edit] = await bank.update(body, {
        where: {
          id: bankId,
        },
      });
      const data = await bank.findOne({
        where: {
          id: bankId,
        },
      });

      if (edit === 1) {
        response.status = 201;
        response.message = 'Bank Successfully Edited';
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

  deleteBank: (async(req,res) => {
    let response = {};
    try {
      const bankId = req.params.bankId;
      const data = await bank.destroy({
        where: {
          id: bankId,
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