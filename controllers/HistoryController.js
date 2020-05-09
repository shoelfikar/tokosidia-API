const history = require('../models').history;
const users = require('../models').user_id;
const address = require('../models').address;
const account = require('../models').bank_account;
const bank = require('../models').bank;
const helpers = require('../helpers/response');

module.exports = {
  getHistory: (async(req, res) => {
    let response = {};
    try {
      const data = await history.findAll({
        where: {
          user_id: req.user_id,
          // is_done: 1 
        },
        include: [
          {model: users, as:'myhistory', attributes: ['email', 'fullname',], include: [
            {model: address, as: 'addresses', attributes:['address', 'phone_number']}
          ]}]
      });
      if (data.length === 0) {
        response.status = 404;
        response.message = 'History List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Data All History!';
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

  detailHistory: (async(req, res) => {
    let response = {};
    try {
      historyId = req.params.historyId;

      const data = await history.findOne({
        where: {
          id: historyId,
        },
        include: [
          {model: users, as:'myhistory', attributes: ['email', 'fullname',], include: [
            {model: address, as: 'addresses', attributes:['address', 'phone_number']},
            {model: account, as: 'account', attributes:['bank_id', 'account_number', 'account_name'], include: [
              {model: bank, as: 'bankName', attributes:['bank_name']}
            ]}
          ]}]
      });

      if (!data) {
        response.status = 404;
        response.message = 'History Detail not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Detail History List!';
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

  updateHistory: (async(req, res) => {
    let response = {};
    try {
      const historyId = req.params.historyId;
      const body = req.body;

      const [edit] = await history.update(body, {
        where: {
          id: historyId,
        },
      });
      const data = await history.findOne({
        where: {
          id: historyId,
        },
      });
      if (edit === 1) {
        response.status = 200;
        response.message = 'History Successfully Edited';
        response.data = data;
        helpers.helpers(res, response);
      }
      if (edit === 0) {
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

  deleteHistory: (async(req,res) => {
    let response = {};
    try {
      const historyId = req.params.historyId;
      const data = await history.destroy({
        where: {
          id: historyId,
        }
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