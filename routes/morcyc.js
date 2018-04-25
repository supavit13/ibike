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
    if(res.session.userId) morcyc.create(req, res);
    else res.redirect("/");
    
});
router.post('/morcyc/getlatlng', function (req, res) {
    if(res.session.userId) morcyc.saveLatlng(req,res);
    else res.redirect("/");
});
router.post('/morcyc/turnoff', function (req, res) {
    if(res.session.userId) morcyc.turnOff(req,res);
    else res.redirect("/");
});
router.post('/repair',function(req,res){
    if(res.session.userId) morcyc.saveRepair(req,res);
    else res.redirect("/");
});
router.post('/morcyc/cancelBooking', function (req, res) {
    if(res.session.userId) morcyc.cancelBooking(req,res);
    else res.redirect("/");
});

router.post('/morcyc/:id/updateCode',function(req,res){
    if(res.session.userId) morcyc.updateCode(req,res);
    else res.redirect("/");
});


module.exports = router;