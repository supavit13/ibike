var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var bcrypt = require('bcrypt');
var MotorSchema = new Schema({
    brand: {
        type: String,
        required :true
    },
    latlng: {
        type: Object,
        required :true
    },
    history: {
        type: Object
    },
    status: {
        type: Object
    },
    pictures: {
        type: Object,
        required :true
    },
    plate: {
        type: String,
        required :true
    },
    code: {
        type: String
    },
    using: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('MotorSchema', MotorSchema);