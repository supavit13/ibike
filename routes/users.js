var express = require('express');
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/:code/verify', function(req, res, next) {
  User.where({password:req.params.code}).update({ pass: "User"}, function(err, result) {
    res.send('verify complete');
  });
  
});
module.exports = router;
