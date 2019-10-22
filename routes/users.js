var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

//Esquema de usuarios
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: String,
  password: String
});

const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

router.post('/register', function(req, res) {
  var new_user = new User({
    username: req.username
  });
  new_user.password = new_user.generateHash(userInfo.password);
  new_user.save();
});

router.post('/login', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (!user.validPassword(req.body.password)) {
      //password did not match
    } else {
      // password matched. proceed forward
    }
  });
});

module.exports = router;
