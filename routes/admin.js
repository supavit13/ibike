var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
var User = require("../models/User");
var morcyc = require("../controllers/MotorController.js");
var admin = require("../controllers/AdminController.js");
var usercon = require("../controllers/UserController.js");

function requiresLoginAdmin(req, res, next) {
    if (req.session && req.session.userId) {
        User.findById({ _id: req.session.userId }).exec(function (err, user) {
            if (user["pass"] == "Admin") {
                return next();
            } else {
                var err = new Error("You don't have permission for this.");
                err.status = 401;
                return next(err);
            }
        });
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}

router.post("/ping", function (req, res) {
    admin.ping(req, res);
});
router.get('/morcyc',requiresLoginAdmin, function (req, res, next) {
    res.render("morcyc");
});
router.get('/', requiresLoginAdmin, function (req, res, next) {
    admin.plotToMapAdmin(req, res);
});
router.get("/listname", requiresLoginAdmin, function (req, res, next) {
    admin.userList(req, res);
});
router.get("/listmotorcycle", requiresLoginAdmin, function (req, res, next) {
    admin.morcycList(req, res);

});
router.post("/add", function (req, res) {
    console.log(req.body.id);
    admin.insertUser(req, res);
});
router.post("/del", function (req, res) {
    admin.deleteUser(req, res);
});
router.post("/setZone", function (req, res) {
    console.log(req.body.size);
    admin.setZone(req, res);
});
router.get("/profile/:id",requiresLoginAdmin, function (req, res) {
    usercon.getuser(req, res);
});
router.get("/motorcycle/:id",requiresLoginAdmin, function (req, res) {
    morcyc.getmotorcycle(req, res);
});

router.get('/history',requiresLoginAdmin, function (req, res, next) {
    admin.Historydata(req, res);
});

router.get('/getLat', function (req, res, next) {
    admin.polygonLat(req, res);
});
router.get('/getLng', function (req, res, next) {
    admin.polygonLng(req, res);
});

router.post('/checkzone', function (req, res, next) {
    console.log("before checkzone");
    admin.checkzone(req, res);
});
router.get('/topup/:id/:money',requiresLoginAdmin,function(req,res){
    usercon.topup(req,res);
  });

module.exports = router;