var mongoose = require("mongoose");
var Motorcycle = require("../models/Motorcycle");
var Zone = require("../models/MotorcycleZone");
var User = require("../models/User");
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var AdminController = {};
AdminController.plotToMapAdmin = function (req, res) {
    var zone;
    Zone.find({}).exec(function(err,zs){
        console.log(zs);
        if(err) console.log(err);
        else zone=zs;
    });
    // console.log(zone);
    Motorcycle.find({}).exec(function (err, morcyc) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.send(users);
            
            res.render("../views/admin/index", { morcyc: morcyc,zone:zone });
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
AdminController.setZone = function(req, res){
    Zone.remove({}, function(err,removed) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully");
        }
    });
    var schema;
    var zone = [];
    var leng = parseInt(req.body.size);
    // console(req.body.size);
    for(var i=0;i<leng;i++){
        zone[i] = req.body['zone['+ i +'][]'];
    }
    schema = {
        zone : zone
    };
    var motor = new Zone(schema);
    console.log(motor);
    motor.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully");
        }
    });


    res.send(true);
}
AdminController.deleteUser = function (req, res) {
    var pwd = "kusrc150308";
    var email;
    User.findOne({_id : req.body.id}).exec(function(err,user){
        email=user['email'];
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'morcyc4you@gmail.com',
                pass: pwd
            }
        });

        var mailOptions = {
            from: 'morcyc4you@gmail.com',
            to: email,
            subject: 'เกิดข้อผิดพลาดในการสมัครสมาชิก',
            text: 'ลาก่อน'
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
        // res.send(true);
    });
    User.findByIdAndRemove(req.body.id, function (err, user) {
        if (err) throw err;
        console.log(req.body.id);

        
        console.log('Removed !');
        res.send(true);
    });
};
module.exports = AdminController;

//solution nodejs email
//https://stackoverflow.com/questions/20337040/gmail-smtp-debug-error-please-log-in-via-your-web-browser