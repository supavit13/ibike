var mongoose = require("mongoose");
var Motorcycle = require("../models/Motorcycle");
var Zone = require("../models/MotorcycleZone");
var User = require("../models/User");
var ping = require("../models/ping");
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');

var moment = require('moment-timezone');
var AdminController = {};






AdminController.ping = function (req, res) {
    var strinput = Date.now();
    var strdate = new Date(strinput);
    var dateeee = moment(strdate).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
    var msg = req.body.msg;
    if (msg == "repair") {
        var datarepair = {
            motorID: req.body.id,
            userID: req.body.userId,
            topic: req.body.msg,
            date: dateeee
        }
        var pingping = new ping(datarepair);
        pingping.save(function (err) {
            if (err) {
                console.log(err);
                res.send(false);
            } else {
                res.send(true);
            }
        });
    }
    if (msg == "outofarea") {
        var dataout = {
            motorID: req.session.morcycId,
            userID: req.session.userId,
            topic: req.body.msg,
            date: dateeee
        }
        var pingping = new ping(dataout);
        pingping.save(function (err) {
            if (err) {
                console.log(err);
                res.send(false);
            } else {
                res.send(true);
            }
        });
    }
    if (msg == "inarea") {
        var dataout = {
            motorID: req.session.morcycId,
            userID: req.session.userId,
            topic: req.body.msg,
            date: dateeee
        }
        var pingping = new ping(dataout);
        pingping.save(function (err) {
            if (err) {
                console.log(err);
                res.send(false);
            } else {
                res.send(true);
            }
        });
    }
}
AdminController.Historydata = function (req, res) {
    ping.find({}).exec(function (err, histo) {
        res.render("../views/history", { historyy: histo });
    })
}

AdminController.plotToMapAdmin = function (req, res) {
    var zone;
    Zone.find({}).exec(function (err, zs) {
        console.log(zs);
        if (err) console.log(err);
        else zone = zs;
    });
    // console.log(zone);
    Motorcycle.find({}).exec(function (err, morcyc) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.send(users);

            res.render("../views/admin/index", { morcyc: morcyc, zone: zone });
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
AdminController.setZone = function (req, res) {
    Zone.remove({}, function (err, removed) {
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
    for (var i = 0; i < leng; i++) {
        zone[i] = req.body['zone[' + i + '][]'];
    }


    schema = {
        zone: zone
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
    // "zone" : [ 
    //     [ 
    //         "13.445492389142101", 
    //         "100.94100952148439"
    //     ], 
    //     [ 
    //         "13.466878891069948", 
    //         "100.97671508789064"
    //     ], 
    //     [ 
    //         "13.462869067473061", 
    //         "101.00692749023438"
    //     ], 
    //     [ 
    //         "13.55489172382604", 
    //         "101.09344482421875"
    //     ], 
    //     [ 
    //         "13.57359643529671", 
    //         "101.19232177734376"
    //     ], 
    //     [ 
    //         "13.50945987010966", 
    //         "101.34613037109375"
    //     ], 
    //     [ 
    //         "13.373112476757473", 
    //         "101.55212402343751"
    //     ], 
    //     [ 
    //         "13.193872245715633", 
    //         "101.71142578125"
    //     ], 
    //     [ 
    //         "13.148372391779004", 
    //         "101.69219970703126"
    //     ], 
    //     [ 
    //         "13.033246905385807", 
    //         "101.41479492187501"
    //     ], 
    //     [ 
    //         "13.073413065643518", 
    //         "101.18957519531251"
    //     ], 
    //     [ 
    //         "13.030568929375276", 
    //         "101.18133544921876"
    //     ], 
    //     [ 
    //         "13.014500465182076", 
    //         "101.09619140625"
    //     ], 
    //     [ 
    //         "12.641958602667133", 
    //         "101.00280761718751"
    //     ], 
    //     [ 
    //         "12.518550805048974", 
    //         "101.00830078125"
    //     ], 
    //     [ 
    //         "12.483663963333774", 
    //         "100.9478759765625"
    //     ], 
    //     [ 
    //         "12.596358286049782", 
    //         "100.8819580078125"
    //     ], 
    //     [ 
    //         "12.652686907156063", 
    //         "100.70343017578126"
    //     ], 
    //     [ 
    //         "12.81623746581153", 
    //         "100.78308105468751"
    //     ], 
    //     [ 
    //         "12.920747035269438", 
    //         "100.61828613281251"
    //     ], 
    //     [ 
    //         "13.022534827559005", 
    //         "100.67596435546876"
    //     ], 
    //     [ 
    //         "13.009144078915368", 
    //         "100.84350585937501"
    //     ], 
    //     [ 
    //         "13.07876806012751", 
    //         "100.80230712890626"
    //     ], 
    //     [ 
    //         "13.180490813669216", 
    //         "100.74188232421876"
    //     ], 
    //     [ 
    //         "13.447979470764816", 
    //         "100.94512939453125"
    //     ]
    // ],

    res.send(true);
}
AdminController.insertUser = function (req, res) {
    var pwd = "kusrc150308";
    var email;
    User.findOne({ _id: req.body.id }).exec(function (err, user) {
        email = user['email'];
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
            subject: '[Morcyc4you]Register complete',
            text: 'You have approved by admin'
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
        User.where({ _id: req.body.id }).update({ pass: "User" }, function (err, result) {
            res.send(true);
        });
        // res.send(true);
    });
}
AdminController.deleteUser = function (req, res) {
    var pwd = "kusrc150308";
    var email;
    User.findOne({ _id: req.body.id }).exec(function (err, user) {
        email = user['email'];
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
            subject: '[Morcyc4you]You were rejected',
            text: 'You have been denied access to Morcyc4you. Because incomplete or false information. If you have any questions, please contact Morcyc4you@gmail.com'
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
    });
    res.send(true);
};

AdminController.polygonLat = function (req, res) {
    Zone.find({}).exec(function (err, zs) {
        if (err) res.send(err);
        else {
            var array = zs[0]["zone"];
            var str = "";
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < 1; j++) {
                    str += array[i][j] + ",";
                }
            }
            res.send(str);
        }
    });
}
AdminController.polygonLng = function (req, res) {
    Zone.find({}).exec(function (err, zs) {
        if (err) res.send(err);
        else {
            var array = zs[0]["zone"];
            var str = "";
            for (var i = 0; i < array.length; i++) {
                for (var j = 1; j < 2; j++) {
                    str += array[i][j] + ",";
                }
            }
            res.send(str);
        }
    });
}
AdminController.setno = function (req, res) {
    Motorcycle.where({ _id : req.params.id }).update({using : "no"},function (err, morcyc) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.send(users);
            res.send("Set no complete.");
        }
    });
}
AdminController.checkzone = function (req, res) {
    var motorcycID = req.body.data;
    var latlng = req.body.latlng;
    var strinput = Date.now();
    var strdate = new Date(strinput);
    var dateeee = moment(strdate).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
    console.log("in checkzone");
    console.log(motorcycID);
    console.log(latlng);
    console.log(req.body);
    var dataout = {
        motorID: motorcycID,
        userID: "System",
        topic: "carjacker",
        date: dateeee
    }
    var pingping = new ping(dataout);
    pingping.save(function (err) {
        if (err) {
            console.log(err);

        } else {

        }
    });
    Motorcycle.where({ _id: motorcycID }).update({ latlng: latlng }, function (err, result) {

    });
    res.send(true);
}
module.exports = AdminController;

//solution nodejs email
//https://stackoverflow.com/questions/20337040/gmail-smtp-debug-error-please-log-in-via-your-web-browser