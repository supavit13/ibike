var express = require('express');
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/:id/verify', function(req, res, next) {
  User.where({_id:req.params.id}).update({ pass: "PreUser"}, function(err, result) {
    if(err) res.send(err);
    else res.render('../views/verfiy.ejs',{user : result});
  });
  
});
module.exports = router;
