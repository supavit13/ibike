var express = require('express');
var request = require('request-promise');
var moment = require('moment');
var router = express.Router();
var morcyc = require("../controllers/MotorController.js");

router.get('/morcyc', function (req, res, next) {
    res.render("morcyc");
});
router.post('/morcyc', function (req, res) {
    morcyc.create(req, res);
});
module.exports = router;