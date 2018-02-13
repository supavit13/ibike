var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var bcrypt = require('bcrypt');
var MotorSchema = new Schema({
    motorID: {
        type: Number
    },
    name: {
        type: String
         //required :true
    },
    brand: {
        type: String
         //required :true
    },
    latlng: {
        type: Object
    },
    history: {
        type: Object
    },
    status: {
        type: Object
    },
    pictures: {
        type: Object
    },
    date: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('MotorSchema', MotorSchema);