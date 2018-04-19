var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
var User = require("../models/User");
var morcyc = require("../controllers/MotorController.js");
var admin = require("../controllers/AdminController.js");
var usercon = require("../controllers/UserController.js");

router.post("/ping",function(req,res){
    admin.ping(req,res);
});

router.get('/', function (req, res, next) {
    if(req.session.userId){
        User.findById({ _id : req.session.userId}).exec(function(err,user){
            if(user["pass"] == "Admin"){
                admin.plotToMapAdmin(req,res);
            }else{
                res.redirect("/");
            }
        });
    }else {
        res.redirect("/");
    }
    
    
});
router.get("/listname",function(req,res,next){
    if(req.session.userId){
        User.findById({ _id : req.session.userId}).exec(function(err,user){
            if(user["pass"] == "Admin"){
                admin.userList(req,res);
            }else{
                res.redirect("/");
            }
        });
    }else {
        res.redirect("/");
    }
});
router.get("/listmotorcycle",function(req,res,next){
        if(req.session.userId){
            User.findById({ _id : req.session.userId}).exec(function(err,user){
                if(user["pass"] == "Admin"){
                    admin.morcycList(req,res);
                }else{
                    res.redirect("/");
                }
            });
        }else {
            res.redirect("/");
        }
    
});
router.post("/add",function(req,res){
    console.log(req.body.id);
    admin.insertUser(req,res);
});
router.post("/del",function(req,res){
    admin.deleteUser(req,res);
});
router.post("/setZone",function(req,res){
    console.log(req.body.size);
    admin.setZone(req,res);
});
router.get("/profile/:id",function(req,res){
    if(req.session.userId){
        User.findById({ _id : req.session.userId}).exec(function(err,user){
            if(user["pass"] == "Admin"){
                usercon.getuser(req,res);
            }else{
                res.redirect("/");
            }
        });
    }else {
        res.redirect("/");
    }
});
router.get("/motorcycle/:id",function(req,res){
    if(req.session.userId){
        User.findById({ _id : req.session.userId}).exec(function(err,user){
            if(user["pass"] == "Admin"){
                morcyc.getmotorcycle(req,res);
            }else{
                res.redirect("/");
            }
        });
    }else {
        res.redirect("/");
    }
});

router.get('/history', function (req, res, next) {
    if(req.session.userId){
        admin.Historydata(req,res);
    }else {
        res.redirect("/");
    }
});

router.get('/getLat', function (req, res, next) {
    admin.polygonLat(req,res);
});
router.get('/getLng', function (req, res, next) {
    admin.polygonLng(req,res);
});

router.post('/checkzone', function (req, res, next) {
    console.log("before checkzone");
    admin.checkzone(req,res);
});


module.exports = router;