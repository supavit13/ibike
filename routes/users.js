var express = require('express');
var router = express.Router();
var users = require("../controllers/UserController.js");

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
      return next();
  } else {
      var err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
  }
}
router.get('/:id/verify', function (req, res, next) {
  users.verify(req,res);
});
router.post('/getemail',function(req,res){
  users.getemail(req,res);
});
router.post('/forgetpassword',function(req,res){
  users.forgetPassword(req,res);
});
router.get('/changepassword',requiresLogin,function(req,res){
    res.render('../views/changepassword');
});
router.post('/changepassword',requiresLogin,function(req,res){
  users.changepassword(req,res);
});
module.exports = router;
