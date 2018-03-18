var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var strinput = Date.now();
var strdate = new Date(strinput);
var dateeee = moment(strdate).format("YYYY-MM-DD HH:mm:ss");
var Users = new Schema({
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
    password: {
        type: String,
        required :true
    },
    address: {
        postcode: {
            type: Number,
            required :true
        },
        province: {
            type: String,
            required :true
        },
        district: {
            type: String,
            required :true
        },
        moo: {
            type: String,
            required :true
        },
        number: {
            type: String,
            required :true
        },
        country: {
            type: String,
            required :true
        }
    },
    license: {
        type: Object,
        required :true
    },
    pass: {
        type: String,
        require: true
    },
    bookingID: {
        type: String
    },
    date: {
        type: String,
        default: dateeee
    }
});
Users.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 8, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

module.exports = mongoose.model('Users', Users);
