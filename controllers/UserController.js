var mongoose = require("mongoose");
var User = require("../models/User");
var moment = require("moment");
var UserController = {};
UserController.create = function (req, res) {
    
    var schema = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password,
        address: {
            number: req.body.number,
            moo: req.body.moo,
            tumbol: req.body.tumbol,
            district: req.body.district,
            province: req.body.province,
            postcode: req.body.postcode,
            country: req.body.country

        },
        license: {
            picFront: req.body.picFront,
            picBack: req.body.picBack,
            picOwn: req.body.picOwn
        },
        pass: req.body.pass
    }
    var user = new User(schema);
    console.log(user);
    user.save(function (err) {
        if (err) {
            console.log(err);
            res.render("../views/register/index.ejs");
        } else {
            console.log("Successfully created a user.");
            res.redirect("/");
        }
    });
};


module.exports = UserController;