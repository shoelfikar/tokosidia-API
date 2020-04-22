const history = require('../models').history;
const helpers = require('../helpers/response');

module.exports = {
  insertHistory: (async (req, res) => {
    let response = {};
    try {
      const body = req.body;
      const data = await history.create(body);
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'History Has Been Created!';
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
  getHistory: (async(req, res) => {
    let response = {};
    try {
      const data = await history.findAll({});
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