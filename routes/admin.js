var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
var User = require("../models/User");
var morcyc = require("../controllers/MotorController.js");
var admin = require("../controllers/AdminController.js");
var usercon = require("../controllers/UserController.js");

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

module.exports = router;