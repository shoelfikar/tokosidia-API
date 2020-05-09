const history = require('../models').order;
const helpers = require('../helpers/response');

module.exports = {
  getHistory: (async(req, res) => {
    let response = {};
    try {
      const data = await history.findAll({
        where: {
          user_id: req.user_id,
          // is_done: 1 
        }
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

}