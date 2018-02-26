var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var bcrypt = require('bcrypt');
var MotorcycleZone = new Schema({
    zone: {
        type: Object,
        required :true
    },
    date: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('MotorcycleZone', MotorcycleZone);