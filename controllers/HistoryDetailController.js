const historyDtl = require('../models').history_detail;
const helpers = require('../helpers/response');

module.exports = {
  insertHistoryDtl: (async (req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await historyDtl.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'History Detail Has Been Created!';
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
  getHistoryDtl: (async(req, res) => {
    let response = {};
    try {
      const data = await historyDtl.findAll({});
      if (data.length === 0) {
        response.status = 404;
        response.message = 'History Detail List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Data All History Detail!';
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

  detailHistoryDtl: (async(req, res) => {
    let response = {};
    try {
      detailId = req.params.detailId;

      const data = await historyDtl.findOne({
        where: {
          id: detailId,
        },
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

  updateHistoryDtl: (async(req, res) => {
    let response = {};
    try {
      const detailId = req.params.detailId;
      const body = req.body;

      const [edit] = await historyDtl.update(body, {
        where: {
          id: detailId,
        },
      });
      const data = await historyDtl.findOne({
        where: {
          id: detailId,
        },
      });
      if (edit === 1) {
        response.status = 200;
        response.message = 'History Detail Successfully Edited';
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

  deleteHistoryDtl: (async(req,res) => {
    let response = {};
    try {
      const detailId = req.params.detailId;
      const data = await historyDtl.destroy({
        where: {
          id: detailId,
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