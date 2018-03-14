var express = require('express');
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/:id/verify', function(req, res, next) {
  User.where({_id:req.params.id}).update({ pass: "User"}, function(err, result) {
    res.send('verify complete');
  });
  
});
module.exports = router;
