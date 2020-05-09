const bankAccount = require('../models').bank_account;
const bank = require('../models').bank;
const user = require('../models').user_id;
const helpers = require('../helpers/response');

module.exports = {
  insertBankAccount: (async(req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await bankAccount.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'Bank Account Has Been Created';
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

  getBankAccount: (async(req,res) => {
    let response = {};
    try {
      const data = await bankAccount.findAll({
        include: {
          model: bank,
          as: 'bankName',
          attributes: ['bank_name']
        },
        include: {
          model: user,
          as: 'account',
          attributes: ['fullname']
        }
      });
      if (data.length === 0) {
        response.status = 404;
        response.message = 'Bank Acoount List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Bank Account all list!';
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

  detailBankAccount: (async(req, res) => {
    let response = {};
    try {
      accountId = req.params.accountId;

      const data = await bankAccount.findOne({
        where: {
          id: accountId,
        },
        include: {
          model: bank,
          as: 'bankName',
          attributes: ['bank_name']
        },
        include: {
          model: user,
          as: 'account',
          attributes: ['fullname']
        }
      });

      if (!data) {
        response.status = 404;
        response.message = 'Bank Account Detail not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Bank Account Detail list!';
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

  updateBankAccount: (async(req, res) => {
    let response = {};
    try {
      const accountId = req.params.accountId;
      const body = req.body;

      const [edit] = await bankAccount.update(body, {
        where: {
          id: accountId,
        },
      });
      const data = await bankAccount.findOne({
        where: {
          id: accountId,
        },
      });

      if (edit === 1) {
        response.status = 201;
        response.message = 'Bank Account Successfully Edited';
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

  deleteBankAccount: (async(req, res) => {
    let response = {};
    try {
      const accountId = req.params.accountId;
      const data = await bankAccount.destroy({
        where: {
          id: accountId,
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