var mongoose = require("mongoose");
var Motorcycle = require("../models/Motorcycle");
var User = require("../models/User");
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var AdminController = {};
AdminController.plotToMapAdmin = function (req, res) {
    Motorcycle.find({}).exec(function (err, morcyc) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.send(users);
            res.render("../views/admin/index", { morcyc: morcyc });
        }
    });
}
AdminController.userList = function (req, res) {
    User.find({}).exec(function (err, users) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.send(users);
            res.render("../views/admin/listname", { users: users });
        }
    });
};

AdminController.morcycList = function (req, res) {
    Motorcycle.find({}).exec(function (err, morcyc) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.send(users);
            res.render("../views/admin/listmotorcycle", { morcyc: morcyc });
        }
    });
};

AdminController.deleteUser = function (req, res) {
    var pwd = "1905306b";
    var email;
    User.findOne({_id : req.body.id}).exec(function(err,user){
        email=user['email'];
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'supavit13@gmail.com',
                pass: pwd
            }
        });

        var mailOptions = {
            from: 'supavit13@gmail.com',
            to: email,
            subject: 'เกิดข้อผิดพลาดในการสมัครสมาชิก',
            text: 'ลาก่อน'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
    // User.findByIdAndRemove(req.body.id, function (err, user) {
    //     if (err) throw err;
    //     console.log(req.body.id);

        
    //     console.log('Removed !');
    //     res.send(true);
    // });
};
module.exports = AdminController;

//solution nodejs email
//https://stackoverflow.com/questions/20337040/gmail-smtp-debug-error-please-log-in-via-your-web-browser