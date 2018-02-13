var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var strinput = Date.now();
var strdate = new Date(strinput);
var dateeee = moment(strdate).format("YYYY-MM-DD HH:mm:ss");
var UserSchema = new Schema({
    userID: {
        type: Number
    },
    firstName: {
        type: String,
        required :true
    },
    lastName: {
        type: String,
        required :true
    },
    tel: {
        type: String,
        required :true
    },
    email: {
        type: String,
        unique: true,
        required :true
    },
    username: {
        type: String,
        unique: true,
        required :true
    },
    password: {
        type: String,
        required :true
    },
    address: {
        type: Object,
        required :true
    },
    license: {
        type: Object,
        required :true
    },
    date: {
        type: String,
        default: dateeee
    }
});
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 8, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

module.exports = mongoose.model('UserSchema', UserSchema);