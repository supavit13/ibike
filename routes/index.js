var express = require('express');
var login = require("../controllers/LoginController.js");
var motorcycle = require("../controllers/MotorController.js");
var user = require("../controllers/UserController.js");
var validator = require("email-validator");
var emailExistence = require("email-existence");
var router = express.Router();
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
      return next();
  } else {
      var err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
  }
}
/* GET home page. */
router.get('/', function (req, res, next) {
  login.checksessions(req, res);
});
router.post('/login', function (req, res, next) {
  if (req.session.userId) {
    res.send("This account already login");
  }
  else if (validator.validate(req.body.email)) {
    console.log("email exist");
    login.authenticate(req, res);
  } else {
    res.send("Invalid email");
  }
});
router.get('/showbike',requiresLogin, function (req, res, next) {
  motorcycle.plotToMap(req, res);

});

router.get('/start',requiresLogin, function (req, res, next) {
  motorcycle.startengine(req, res);
});
router.get('/riding',requiresLogin, function (req, res, next) {
  user.riding(req, res);
});

router.get('/logout',requiresLogin, function (req, res, next) {
  login.logout(req, res);

});
router.get('/repair/:id',requiresLogin, function (req, res) {
  motorcycle.repairMorcyc(req, res);
});
router.post('/booking', function (req, res) {
  motorcycle.searchMorcyc(req, res);

});
router.get('/awake', function (req, res) {
  console.log("awake");
  res.send(true);
});

router.get('/historyUser',requiresLogin, function (req, res) {
  user.historyUser(req, res);
});
router.post('/booking', function (req, res) {
  motorcycle.searchMorcyc(req, res);

});

router.post('/getwallet', function (req, res) {
  user.getwallet(req, res);
});



module.exports = router;
