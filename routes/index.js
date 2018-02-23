var express = require('express');
var login = require("../controllers/LoginController.js");
var motorcycle = require("../controllers/MotorController.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render("menu");
});
router.post('/login', function(req, res, next) {
  login.authenticate(req,res);
  // res.render('index', { title: 'Express' });
});
router.get('/netpie', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render("netpiedata");
});
router.get('/showbike', function(req, res, next) {
  motorcycle.plotToMap(req,res);
});

router.get('/price', function(req, res, next) {
  res.render("price");
});
router.get('/start', function(req, res, next) {
  res.render("start");
});
router.get('/riding', function(req, res, next) {
  res.render("riding");
});
router.get('/listname', function(req, res, next) {
  res.render("listname");
});
router.get('/listname/001', function(req, res, next) {
  res.render("profile");
});
router.get('/listmotorcycle', function(req, res, next) {
  res.render("listmotorcycle");
});
router.get('/listmotorcycle/001', function(req, res, next) {
  res.render("bikestatus");
});
router.get('/morcyc', function(req, res, next) {
  res.render("morcyc");
});
router.post("/",function(req,res,next){
  console.log('right2222');
});

module.exports = router;
