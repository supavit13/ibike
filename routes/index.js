var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render("menu");
});
router.get('/showbike', function(req, res, next) {
  res.render("showbike");
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
// router.get('/register', function(req, res, next) {
//   res.render("register");
// });
router.get('/admin', function(req, res, next) {
  res.render("admin");
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

module.exports = router;
