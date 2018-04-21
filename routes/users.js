var express = require('express');
var router = express.Router();
var users = require("../controllers/UserController.js");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/:id/verify', function (req, res, next) {
  users.verify(req,res);
});
router.post('/getemail',function(req,res){
  users.getemail(req,res);
});
router.post('/forgetpassword',function(req,res){
  users.forgetPassword(req,res);
});
router.get('/changepassword',function(req,res){
  if (req.session.userId) {
    res.render('../views/changepassword');
  } else {
    res.redirect("/")
  }
});
router.post('/changepassword',function(req,res){
  if (req.session.userId) {
    users.changepassword(req,res);
  } else {
    res.redirect("/")
  }
});
module.exports = router;
