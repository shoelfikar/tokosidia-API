require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer')
const user_id = require('../models').user_id;
const seller = require('../models').seller;
const account = require('../models').bank_account;
const bank = require('../models').bank;
const address = require('../models').address;
const role = require('../models').role_id;
const wishlist = require('../models').wishlist;
const product = require('../models').product;
const favorit = require('../models').favorit_shop;
const { Op } = require("sequelize");
const helpers = require('../helpers/response');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  insertUser: (async (req, res) => {
    let response = {};
    try {
      const salt = bcrypt.genSaltSync(10);
      const users = await user_id.findOne({
        where: {
          email: req.body.email
        }
      })
      if (users) {
        response.status = 203;
        response.message = 'Email anda sudah terdaftar';
        helpers.helpers(res, response);
      } else {
      const data = await user_id.create({
        email: req.body.email,
        fullname: req.body.fullname,
        password: bcrypt.hashSync(req.body.password, salt),
        status: 0,
        // image: `http://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`,
        phone_number: 0,
        gender:0,
        // birthday:0,
        address: 0,
        role: 1,
        seller_id: 0,
        wishlist: 0,
        bank_account: 0,
        history:0
      });
      if (data === undefined) {
        response.status = 203;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      } else {
        const token = jwt.sign({id: data.id ,email: data.email},process.env.SECRET_KEY)
        const transporter = nodeMailer.
        createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        })
        const mailFrom = {
          from: process.env.EMAIL,
          to: data.email,
          subject: 'Saatnya Aktivasi Akun Tokosidia Kamu',
          html: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
              <style>
                  * {
                      font-family: sans-serif;
                  }
                  h2 {
                      text-align: center;
                      background: #03ac0e;
                      width: 500px;
                      height: 60px;
                      line-height: 60px;
                      margin: 30px auto;
                      color: #fff;
                  }
                  .link {
                      display: inline-block;
                      width: 250px;
                      height: 40px;
                      line-height: 40px;
                      text-decoration: none;
                      color: #ffffff !important;
                      font-weight: bold;
                      text-align: center;
                      background: #03ac0e;
                      margin-left: 40%;
                  }
                  .link-1{
                      text-decoration: none;
                  }
              </style>
          </head>
          <body>
              <h2>Verifikasi alamat email kamu</h2>
              <p>Terima kasih karena telah melakukan registrasi di tokosidia. Username kamu atas nama ${data.fullname}.
                  verifikasi email anda dengan mengklik link dibawah ini,agar anda dapat menikmati berbelanja barang-barang berkualitas di website kami.
                  Klik tombol dibawah atau <a href="${process.env.ACTIVATION + token}" class="link-1">link ini</a> untuk mengaktifkan akun</p>
                  <a href="${process.env.ACTIVATION + token}" class="link">Verifikasi Alamat Email</a>
          </body>
          </html>`
      }
      transporter.sendMail(mailFrom, (err,info)=> {
        if(err){
            res.send('Email Activation Failed!')
        }
          if (!err) {
            data.dataValues.token = token
            return res.json({
              data: data.dataValues,
              message:'Register Success, Check Your Email For Activation!',
              status_code: 200
          })
          }
      })
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
  loginUser: (async (req, res) => {
    let response = {};
    try {
      const users = await user_id.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {model: seller, as:'store', attributes: ['name', 'address']},
          {model: account, as: 'account', attributes:['bank_id', 'account_number', 'account_name'], include: [
            {model: bank, as: 'bankName', attributes:['bank_name']}
          ]},
          {model: role, as: 'user_role', attributes:['role']},
          {model: favorit, as: 'favorit', attributes:['seller_id'], include:[
            {model: seller, as:'seller_fav', attributes: ['name', 'address']}
          ] },
          {model: address, as: 'addresses', attributes:['address', 'phone_number']},
          {model: wishlist, as: 'userWish', attributes:['produk_id'], include: [
            {model: product, as: 'Produk-name', attributes:['name', 'weight', 'description']}
          ]}
        ],
        where: {
          email: req.body.email
        }
      });
      if (!users) {
        response.status = 203;
        response.message = 'Wrong Email';
        helpers.helpers(res, response);
      } else if (users) {
        const authorized = bcrypt.compareSync(req.body.password, users.dataValues.password);
        if (authorized) {
              const token = jwt.sign({ id: users.id, email: users.email}, process.env.SECRET_KEY);
              users.dataValues.password = undefined;
              users.dataValues.token = token;
              response.status = 200;
              response.message = 'Login Success';
              response.data = users.dataValues;
              helpers.helpers(res, response);
          } else {
              response.status = 203;
              response.message = 'Wrong Password';
              helpers.helpers(res, response);
          }
        }  
    } 
    catch (err) {
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
      const search = req.query.search;
      if (search) {
      const data = await user_id.findAll({
        where: {
          [Op.or]: [
            { fullname: { [Op.substring]: search } }
          ]
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {model: seller, as:'store', attributes: ['name', 'address']},
          {model: account, as: 'account', attributes:['bank_id', 'account_number','account_name'], include: [
            {model: bank, as: 'bankName', attributes:['bank_name']}
          ]},
          {model: role, as: 'user_role', attributes:['role']},
          {model: favorit, as: 'favorit', attributes:['seller_id'], include:[
            {model: seller, as:'seller_fav', attributes: ['name', 'address']}
          ] },
          {model: address, as: 'addresses', attributes:['address', 'phone_number']},
          {model: wishlist, as: 'userWish', attributes:['produk_id'], include: [
            {model: product, as: 'Produk-name', attributes:['name', 'weight', 'description']}
          ]}
        ]
      });
      if (data.length === 0) {
        response.status = 203;
        response.message = 'User List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Data all user!';
        response.data = data;
        helpers.helpers(res, response);
      }
    } else {
      const data = await user_id.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {model: seller, as:'store', attributes: ['name', 'address']},
          {model: account, as: 'account', attributes:['bank_id', 'account_number', 'account_name'], include: [
            {model: bank, as: 'bankName', attributes:['bank_name']}
          ]},
          {model: role, as: 'user_role', attributes:['role']},
          {model: favorit, as: 'favorit', attributes:['seller_id'], include:[
            {model: seller, as:'seller_fav', attributes: ['name', 'address']}
          ] },
          {model: address, as: 'addresses', attributes:['address', 'phone_number']},
          {model: wishlist, as: 'userWish', attributes:['produk_id'], include: [
            {model: product, as: 'Produk-name', attributes:['name', 'weight', 'description']}
          ]}
        ]
      });
      if (data.length === 0) {
        response.status = 203;
        response.message = 'User List not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Data all user!';
        response.data = data;
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

  detailUser: (async(req, res) => {
    let response = {};
    try {
      userId = req.params.userId;

      const data = await user_id.findOne({
        where: {
          id: userId,
        },
        include: [
          {model: seller, as:'store', attributes: ['name', 'address']},
          {model: account, as: 'account', attributes:['bank_id', 'account_number', 'account_name'], include: [
            {model: bank, as: 'bankName', attributes:['bank_name']}
          ]},
          {model: role, as: 'user_role', attributes:['role']},
          {model: favorit, as: 'favorit', attributes:['seller_id'], include:[
            {model: seller, as:'seller_fav', attributes: ['name', 'address']}
          ] },
          {model: address, as: 'addresses', attributes:['address', 'phone_number']},
          {model: wishlist, as: 'userWish', attributes:['produk_id'], include: [
            {model: product, as: 'Produk-name', attributes:['name', 'weight', 'description']}
          ]}
        ]
      });

      if (!data) {
        response.status = 203;
        response.message = 'User Detail not Found!';
        helpers.helpers(res, response); 
      } else {
        response.status = 200;
        response.message = 'Data detail user!';
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
      // const salt = bcrypt.genSaltSync(10);
      // const body = req.body;
      const [edit] = await user_id.update({
        email: req.body.email,
        fullname: req.body.fullname,
        // image: `http://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        birthday: req.body.birthday},
        {
          where: {
            id: userId,
          },
        }
      );
      console.log('here')
      const data = await user_id.findOne({
        where: {
          id: userId,
        },
      });
      if (edit === 1) {
        response.status = 200;
        response.message = 'User Successfully Edited';
        response.data = data;
        helpers.helpers(res, response);
      }
      if (edit === 0) {
        response.status = 203;
        response.message = 'Data Not Found';
        helpers.helpers(res, response);
      }
    } catch (err) {
      response.status = 500;
      response.message = 'Internal Server Error';
      helpers.helpers(res, response);
    }
  }),
  resetPassword: (async(req, res) => {
    let response = {};
    try {
      // const reqtoken = req.query.activated
      // const verify = jwt.verify(reqtoken, process.env.SECRET_KEY)
      const userId = req.params.userId;
      const salt = bcrypt.genSaltSync(10);
      const [edit] = await user_id.update({
        password: bcrypt.hashSync(req.body.password, salt)
        },
        {
          where: {
            id: userId
          }
        }
      );
      const data = await user_id.findOne({
        where: {
          id: userId
        }
      });
      if (edit === 1) {
        response.status = 200;
        response.message = 'Reset Password Success!';
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

  uploadImage: (async(req, res) => {
    let response = {};
    try {
      const userId = req.params.userId;
      const [edit] = await user_id.update({
        image: `http://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`},
        {
          where: {
            id: userId
          }
        }
      );
      const data = await user_id.findOne({
        where: {
          id: userId
        }
      });
      if (edit === 1) {
        response.status = 200;
        response.message = 'Profil Successfully Edited!';
        response.data = data;
        helpers.helpers(res, response);
      }
      if (edit === 0) {
        response.status = 203;
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
  }),
  authUser: (async(req, res) => {
    let response = {};
    try {
    const reqtoken = req.query.activated
    const verify = jwt.verify(reqtoken, process.env.SECRET_KEY)
    const data = await user_id.findOne({
      where: {
        id: verify.id,
      },
    });
    if (data.status == 0) {
    const [edit] = await user_id.update({
          status: 1,
        },
        {
          where: {
            id: verify.id,
          },
      });
      if (edit === 0) {
        response.status = 203;
        response.message = 'Failed Activation';
        helpers.helpers(res, response);
      }
      if (edit === 1) {
        data.dataValues.status = 1;
        response.status = 200;
        response.message = 'Email Has been confirm';
        response.data = data;
        helpers.helpers(res, response);
      }
    } else {
        response.status = 203;
        response.message = 'Failed token';
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