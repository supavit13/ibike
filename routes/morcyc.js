var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var User = require("../models/User");
var morcyc = require("../controllers/MotorController.js");
var router = express.Router();


router.get('/morcyc', function (req, res, next) {
    if(req.session.userId){
        User.findById({ _id : req.session.userId}).exec(function(err,user){
            if(user["pass"] == "Admin"){
                res.render("morcyc");
            }else{
                res.redirect("/");
            }
        });
        
    }else {
        res.redirect("/");
    }
    
});
router.post('/morcyc', function (req, res) {
    morcyc.create(req, res);
});
router.post('/morcyc/getlatlng', function (req, res) {
    morcyc.saveLatlng(req,res);
});
router.post('/morcyc/turnoff', function (req, res) {
    morcyc.turnOff(req,res);
});
router.post('/repair',function(req,res){
    morcyc.saveRepair(req,res);
});


router.post('/morcyc/:id/updateCode',function(req,res){
    morcyc.updateCode(req,res);
});

module.exports = router;