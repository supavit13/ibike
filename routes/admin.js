var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
var User = require("../models/User");
var morcyc = require("../controllers/MotorController.js");
var admin = require("../controllers/AdminController.js");

router.get('/', function (req, res, next) {
    admin.plotToMapAdmin(req,res);
});
router.get("/listname",function(req,res,next){
    admin.userList(req,res);
});
router.get("/listmotorcycle",function(req,res,next){
    admin.morcycList(req,res);
});
router.post("/add",function(req,res){
    console.log(req.body.id);
    User.where({_id:req.body.id}).update({ pass: "User"}, function(err, result) {
        res.send(true);
    });
});
router.post("/del",function(req,res){
    admin.deleteUser(req,res);
});

module.exports = router;