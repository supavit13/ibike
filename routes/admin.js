var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
var User = require("../models/User");
var user = require("../controllers/UserController.js");
var morcyc = require("../controllers/MotorController.js");

router.get('/', function (req, res, next) {
    res.render("admin/index");
});
router.get("/listname",function(req,res,next){
    user.userList(req,res);
});
router.get("/listmotorcycle",function(req,res,next){
    morcyc.morcycList(req,res);
});
router.post("/list",function(req,res){
    console.log(req.body.right);
    User.where({_id:req.body.right}).update({ pass: "User"}, function(err, result) {
        res.render('/admin/listname');
      });
    // User.find({_id:req.body.right}).exec(function(err,users){
    //     if(err){
    //       console.log("Error:",err);  
    //     } 
    //     else{
            
    //         // res.send(users);
    //         res.send({users:users});
    //     }
    // });

});

module.exports = router;