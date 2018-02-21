var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
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
module.exports = router;