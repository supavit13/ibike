var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
var user = require("../controllers/UserController.js");
router.get('/', function (req, res, next) {
    res.render("admin/index");
});
router.get("/listname",function(req,res,next){
    user.userList(req,res);
});
module.exports = router;