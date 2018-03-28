var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var moment = require('moment');
var strinput = Date.now();
var strdate = new Date(strinput);
var dateeee = moment(strdate).format("YYYY-MM-DD HH:mm:ss");

var pingSchema = new Schema({
    topic: {
        type: String,
        required :true
    },
    userID: {
        type: String
    },
    date: {
        type: String,
        default: dateeee
    },
    motorID: {
        type: String
    }

});

module.exports = mongoose.model('pingSchema', pingSchema);