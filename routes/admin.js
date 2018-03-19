var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
var User = require("../models/User");
var morcyc = require("../controllers/MotorController.js");
var admin = require("../controllers/AdminController.js");

function isAdmin(req,res){
    if(req.session.userId){
        User.findById({ _id : req.session.userId}).exec(function(err,user){
            if(user["pass"] == "Admin"){
                return true;
            }else{
                return false;
            }
        });
    }else {
        return false;
    }
}
router.get('/', function (req, res, next) {
    // if(isAdmin(req,res)){
        admin.plotToMapAdmin(req,res);
    // }else {
    //     res.redirect("/");
    // }
    
});
router.get("/listname",function(req,res,next){
    if(isAdmin(req,res)){
        admin.userList(req,res);
    }else {
        res.redirect("/");
    }
    
});
router.get("/listmotorcycle",function(req,res,next){
    if(isAdmin(req,res)){
        admin.morcycList(req,res);
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

module.exports = router;