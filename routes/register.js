var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var validator = require("email-validator");
var emailExistence = require("email-existence");
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
router.post('/emailcheck', function (req, res) {
    if (validator.validate(req.body.email)) {
        emailExistence.check(req.body.email, function (error, response) {
          if (error) res.send("Domain email is incorrect");
          else {
              user.checkDuplicateEmail(req,res);
          }
        });
      } else {
        res.send("Email is incorrect");
      }
    
});
module.exports = router;