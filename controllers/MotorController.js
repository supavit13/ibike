var mongoose = require("mongoose");
var Motorcycle = require("../models/Motorcycle");
var User = require("../models/User");
var Zone = require("../models/MotorcycleZone");
var moment = require("moment");
var MotorController = {};

MotorController.create = function (req, res) {
    var datamorcyc = {
        motorID: req.body.ID,
        name: req.body.Name,
        brand: req.body.Brand,
        latlng: {
            lat: req.body.Lat,
            lng: req.body.Lng
        },
        pictures: {
            picFront: req.body.picFront,
            picBack: req.body.picBack,
            picPlate: req.body.picPlate
        }
    }
    var motorcyc = new Motorcycle(datamorcyc);
    console.log(motorcyc);
    motorcyc.save(function (err) {
        if (err) {
            console.log(err);
            res.render("../views/morcyc.ejs");
        } else {
            console.log("Successfully created a MotorcycDATA.");
            res.redirect("/admin/listmotorcycle");
        }
    });


}


MotorController.plotToMap = function (req, res) {
    var zone;
    Zone.find({}).exec(function (err, zs) {
        if (err) console.log(err);
        else zone = zs;
    });
    console.log(zone);
    Motorcycle.find({}).exec(function (err, morcyc) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            // res.send(users);

            res.render("../views/showbike", { morcyc: morcyc, zone: zone });
        }
    });
}
MotorController.saveLatlng = function (req, res) {
    var temp = req.body;
    var lst = {};
    for (var i = 0; i < 30; i++) {
        lst[i] = temp['his[' + i + '][lat]'] + "," + temp['his[' + i + '][lng]'];
    }
    console.log(lst);
    Motorcycle.findById({ _id: req.body.morcycID }).update({ history: lst }, function (err, result) {
        if (err) console.log(err);
        else {
            console.log(result);
            res.send(true);
        }
    });
}

MotorController.searchMorcyc = function (req, res) {
    Motorcycle.findById({ _id: req.body.morcycID }).update({ using: "yes" }, function (err, result) {
        if (err) res.send(err);
        else {
            User.findById({ _id: req.session.userId }).update({ bookingID: req.body.morcycID }, function (err, result) {
                if (err) res.send(err);
                else {
                    req.session.morcycId = req.body.morcycID;
                    res.send(true);
                }
            });
        }
    });
}
MotorController.turnOff = function (req, res) {

    if (req.session.morcycId != null) {
        var userId = req.session.userId;
        Motorcycle.findById({ _id: req.session.morcycId }).update({ using: "no" }, function (err, result) {
            // console.log("sss");
            if (err) res.send(err);
            else {
                User.find({ bookingID: req.session.morcycId }).update({ bookingID: "" }, function (err, user) {
                    // console.log("sss222");
                    if (err) res.send(err);
                    else {

                        req.session.morcycId = "";
                        // if (req.session) {
                        //     req.session.destroy(function (err) {
                        //         if (err) {
                        //             console.log(err);
                        //         } else {
                        //         }
                        //     });
                        // }

                    }

                });

            }
        });
        // req.session.userId = userId;
        // res.send(req.session.userId);
        res.send(true);
    } else {
        res.send("user null");
    }
}
MotorController.repairMorcyc = function (req, res) {
    var id = req.params.id;
    res.render("../views/repair", { id: id });
}
MotorController.saveRepair = function (req, res) {
    console.log(req.body);
    Motorcycle.findById({ _id: req.body.id }).update({status : req.body},function(err,morcyc){
        if(err) res.send(err);
        else{
            res.send(true);
        }
    });
}
module.exports = MotorController;