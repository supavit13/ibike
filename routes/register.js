var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
var user = require("../controllers/UserController.js");
router.get('/', function (req, res, next) {
    res.render("register/index");
});
router.post('/', function (req, res) {
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }
    user.create(req, res);
});
module.exports = router;