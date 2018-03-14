var mongoose = require("mongoose");
var User = require("../models/User");
var moment = require("moment");
var nodemailer = require('nodemailer');
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
            // res.redirect("/");
            User.findOne({email : req.body.email}).exec(function(err,user){
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'morcyc4you@gmail.com',
                        pass: "kusrc150308"
                    }
                });
        
                var mailOptions = {
                    from: 'morcyc4you@gmail.com',
                    to: user['email'],
                    subject: '[Morcyc4you]รายงานการสมัครสมาชิก',
                    text: 'โปรดยืนยันดัวตนผ่านลิ้งต่อไปนี้ https://morcyc4you.ga/users/'+user["_id"]+"/verify"
                };
        
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    } else {
                        
                        console.log('Email sent: ' + info.response);
                        res.send('Email sent: ' + info.response);
                    }
                });
            });
            res.redirect("/");
        }
    });
};

UserController.checkDuplicateEmail = function(req,res){
    User.findOne({ email: req.body.email }).exec(function (err, user) {
        if (err) {
            res.send("system error");
        } else if (user == null) {
            res.send("Email is correct");
        }else{
            res.send("Email is exist");
        }
    });
}


module.exports = UserController;