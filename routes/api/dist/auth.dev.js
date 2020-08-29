"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../../middleware/auth');

var User = require('../../models/User');

var bodyParser = require('body-parser');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

dotenv = require("dotenv");
dotenv.config();

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult; // @route   GET api/auth
// @desc    Test route
// @acess   Public
//auth in the middle is use to protect the route


router.get('/', auth, function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('-password'));

        case 3:
          user = _context.sent;
          //req.user.id is token id from middleware auth
          res.json(user);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send('server error');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //for sign in

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
router.post('/', jsonParser, [check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()], function _callee2(req, res) {
  var errors, _req$body, email, password, user, isMatch, payload;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context2.sent;

          if (!user) {
            res.status(400).json({
              errors: [{
                msg: 'Invalid Credentials'
              }]
            });
          } //See if user exists
          //Get users gravatar
          //Encrypt password
          //Return jsonwebtoken


          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          isMatch = _context2.sent;

          //user.password is hashed password
          if (!isMatch) {
            res.status(400).json({
              errors: [{
                msg: 'Invalid Credentials'
              }]
            });
          }

          payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: 360000
          }, function (err, token) {
            if (err) throw err;
            res.json({
              token: token
            });
          });
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](4);
          console.error(_context2.t0.message);
          res.status(500).send('Server error');

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 17]]);
});
module.exports = router;