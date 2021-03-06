"use strict";

var jwt = require('jsonwebtoken');

dotenv = require("dotenv");
dotenv.config();

module.exports = function (req, res, next) {
  //Get token from header
  var token = req.header('x-auth-token'); //check if not token

  if (!token) {
    return res.status(401).json({
      msg: 'No token,authorization denied'
    });
  } //verify token


  try {
    var decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user; //decoded.user because we have set user in payload

    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};