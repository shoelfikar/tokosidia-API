require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer')
const user_id = require('../models').user_id;
const seller = require('../models').seller;
const mail = require('../helpers/sendMail');
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
        status: 0,
        image: req.body.image,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        birthday: req.body.birthday,
        address: req.body.address,
        role: 'user',
        seller_id: 0,
        wishlist: 0,
        bank_account: 0,
        history:0
      });
      if (data === undefined) {
        response.status = 404;
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
          to: 'sulfikardi25@gmail.com',
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
                      color: #ffffff;
                      font-weight: bold;
                      text-align: center;
                      background: #03ac0e;
                      margin-left: 40%;
                  }
                  .link a[href]{
                    color: #ffffff;
                  }
                  p a{
                      text-decoration: none;
                  }
              </style>
          </head>
          <body>
              <h2>Verifikasi alamat email kamu</h2>
              <p class="ml-5">Terima kasih karena telah melakukan registrasi di tokosidia. Username kamu atas nama ${data.fullname}.
                  verifikasi email anda dengan mengklik link dibawah ini,agar anda dapat menikmati berbelanja barang-barang berkualitas di website kami.
                  Klik tombol dibawah atau <a href="http://localhost:8000/api/v1/tokosidia/user/auth/?activated=${token}">link ini</a> untuk mengaktifkan akun</p>
                  <a href="http://localhost:8000/api/v1/tokosidia/user/auth/?activated=${token}" class="link">Verifikasi Alamat Email</a>
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
              const token = jwt.sign({ id: users.id, email: users.email}, process.env.SECRET_KEY);
              users.dataValues.password = undefined;
              users.dataValues.token = token;
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
      const data = await user_id.findAll({
        include: [
          {model: seller, as:'store', attributes: ['name', 'address']}
        ]
      });
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
    const [edit] = await user_id.update({
          status: 1,
        },
        {
          where: {
            id: verify.id,
          },
      });
      if (edit === 0) {
        response.status = 404;
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
  } catch (err) {
    response = {};
    response.status = 500;
    response.message = 'Internal Server Error';
    response.err = err;
    helpers.helpers(res, response);
  }
  })
}