var express = require('express');
var login = require("../controllers/LoginController.js");
var motorcycle = require("../controllers/MotorController.js");
var user = require("../controllers/UserController.js");
var validator = require("email-validator");
var emailExistence = require("email-existence");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  login.checksessions(req, res);
  // res.render("menu");
});
router.post('/login', function (req, res, next) {
  if (validator.validate(req.body.email)) {
    // emailExistence.check(req.body.email, function (error, response) {
    //   if (error) res.send("Email does not exist");
    //   else {
        console.log("email exist");
        login.authenticate(req, res);
    //   }
    // });
  } else {
    res.send("Invalid email");
  }
  
  // res.render('index', { title: 'Express' });
});
router.get('/netpie', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  
  if (req.session.userId) {
    res.render("netpiedata");
  } else {
    res.redirect("/")
  }
});
router.get('/showbike', function (req, res, next) {
  if (req.session.userId) {
    motorcycle.plotToMap(req, res);
  } else {
    res.redirect("/")
  }

});

router.get('/price', function (req, res, next) {
  if (req.session.userId) {
    res.render("price");
  } else {
    res.redirect("/")
  }

});
router.get('/start', function (req, res, next) {
  if (req.session.userId) {
    motorcycle.startengine(req,res);
  } else {
    res.redirect("/")
  }
});
router.get('/riding', function (req, res, next) {
  if (req.session.userId) {
    user.riding(req,res);
    // res.render("riding");
  } else {
    res.redirect("/")
  }
});
// router.get('/listname', function (req, res, next) {
//   res.render("listname");
// });
router.get('/listname/001', function (req, res, next) {
  res.render("profile");
});
// router.get('/listmotorcycle', function (req, res, next) {
//   res.render("listmotorcycle");
// });
router.get('/listmotorcycle/001', function (req, res, next) {
  res.render("bikestatus");
});
// router.get('/morcyc', function (req, res, next) {
//   res.render("morcyc");
// });
router.get('/logout', function (req, res, next) {
  if (req.session.userId) {
    login.logout(req, res);
  } else {
    res.redirect("/")
  }
  
});
// router.post("/", function (req, res, next) {
//   console.log('right2222');
// });
router.get('/repair/:id', function (req, res) {
  if (req.session.userId) {
    motorcycle.repairMorcyc(req,res);
  } else {
    res.redirect("/")
  }
});
router.post('/booking', function (req, res) {
  if (req.session.userId) {
    motorcycle.searchMorcyc(req,res);
  } else {
    res.redirect("/")
  }
  
});



module.exports = router;
