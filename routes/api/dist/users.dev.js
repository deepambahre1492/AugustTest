"use strict";

var express = require('express');

var router = express.Router();

var gravatar = require('gravatar');

var bodyParser = require('body-parser');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

dotenv = require("dotenv");
dotenv.config();

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var cors = require('cors');

router.use(cors());

var User = require('../../models/User'); // @route   POST api/users
// @desc    Test route
// @acess   Public
// create application/x-www-form-urlencoded parser


var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
router.post('/', jsonParser, [check('name', 'Name is required').not().isEmpty(), check('email', 'Please include a valid email').isEmail(), check('password', 'Please enter a password with 6 or more characters').isLength({
  min: 6
})], function _callee(req, res) {
  var errors, _req$body, name, email, password, user, avatar, salt, payload;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          user = _context.sent;

          if (user) {
            res.status(400).json({
              errors: [{
                msg: 'User already exists'
              }]
            });
          }

          avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          });
          user = new User({
            name: name,
            email: email,
            avatar: avatar,
            password: password
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 13:
          salt = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 16:
          user.password = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(user.save());

        case 19:
          //See if user exists
          //Get users gravatar
          //Encrypt password
          //Return jsonwebtoken
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
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](4);
          console.error(_context.t0.message);
          res.status(500).send('Server error');

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 23]]);
});
module.exports = router;