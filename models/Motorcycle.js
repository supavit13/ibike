var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var bcrypt = require('bcrypt');
var MotorSchema = new Schema({
    motorID: {
        type: Number,
        unique: true,
        required :true
    },
    name: {
        type: String,
        unique: true,
        required :true
         //required :true
    },
    brand: {
        type: String,
        required :true
         //required :true
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
    using: {
        type: String
    },
    date: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('MotorSchema', MotorSchema);