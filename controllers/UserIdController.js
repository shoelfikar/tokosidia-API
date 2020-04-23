
const bcrypt = require('bcryptjs');
const user_id = require('../models').user_id;
const helpers = require('../helpers/response');



module.exports = {
  insertUser: (async (req, res) => {
    let response = {};
    try {
      const salt = bcrypt.genSaltSync(10);
      const data = await user_id.create({
        email: req.body.email,
        fullname: req.body.fullname,
        password: bcrypt.hashSync(req.body.password, salt),
        status: req.body.status,
        image: req.body.image,
        phone_number: req.body.phone_number,
        address: req.body.address,
        role: req.body.role,
        seller_id: req.body.seller_id,
        wishlist: req.body.wishlist,
        bank_account: req.body.bank_account,
        history:req.body.history
      });
      if (data === undefined) {
        response.status = 404;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        response.status = 200;
        response.message = 'OK';
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
  loginUser: (async (req, res) => {
    let response = {};
    try {
      const users = await user_id.findOne({
        where: {
          email: req.body.email
        }
      });
        if (!users) {
          response.status = 404;
          response.message = 'Wrong Email';
          helpers.helpers(res, response);
        } else if (users) {
          const authorized = bcrypt.compareSync(req.body.password, users.dataValues.password);
          if (authorized) {
              users.dataValues.password = undefined;
              response.status = 200;
              response.message = 'Login Success';
              response.data = users.dataValues;
              helpers.helpers(res, response);
          } else {
              response.status = 404;
              response.message = 'Wrong Password';
              helpers.helpers(res, response);
          }
        }  
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;
      helpers.helpers(res, response);
    }
  }),

  getUser: (async(req, res) => {
    let response = {};
    try {
      const data = await user_id.findAll({});
      if (data.length === 0) {
        response.status = 404;
        response.message = 'User List not Found!';
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

  detailUser: (async(req, res) => {
    let response = {};
    try {
      userId = req.params.userId;

      const data = await user_id.findOne({
        where: {
          id: userId,
        },
      });

      if (!data) {
        response.status = 404;
        response.message = 'User Detail not Found!';
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

  updateUser: (async(req, res) => {
    let response = {};
    try {
      const userId = req.params.userId;
      const body = req.body;

      const [edit] = await user_id.update(body, {
        where: {
          id: userId,
        },
      });
      const data = await user_id.findOne({
        where: {
          id: userId,
        },
      });
      console.log(edit);
      
      console.log('here');
      if (edit === 1) {
        response.status = 201;
        response.message = 'User Successfully Edited';
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

  deleteUser: (async(req,res) => {
    let response = {};
    try {
      const userId = req.params.userId;
      const data = await user_id.destroy({
        where: {
          id: userId,
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