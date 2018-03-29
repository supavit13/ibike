var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var moment = require('moment');
var strinput = Date.now();
var strdate = new Date(strinput);
var dateeee = moment(strdate).format("YYYY-MM-DD HH:mm:ss");
var THdate = dateeee.split(" ")[0]+" "+(parseInt((dateeee.split(" ")[1]).split(":")[0])+7).toString()+":"+dateeee.split(":")[1]+":"+dateeee.split(":")[2];


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
        default: THdate
    },
    motorID: {
        type: String
    }

});

module.exports = mongoose.model('pingSchema', pingSchema);