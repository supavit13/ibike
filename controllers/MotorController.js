var mongoose = require("mongoose");
var Motorcycle = require("../models/Motorcycle");
var User = require("../models/User");
var Zone = require("../models/MotorcycleZone");
var moment = require("moment");
var MotorController = {};
var passwordHash = require('password-hash');
const AWS = require('aws-sdk');
const BUCKET_NAME = 'morcyc4you';
const IAM_USER_KEY = 'AKIAJBYSJVCFVHRX77XQ';
const IAM_USER_SECRET = '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';
var fileUpload = require('express-fileupload');
function uploadToS3(file,location) {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
    });
    s3bucket.createBucket(function () {
      var params = {
       Bucket: BUCKET_NAME,
       Key: "motorcycle/"+location+"/"+file.name,
       Body: file.data,
      };
      s3bucket.upload(params, function (err, data) {
       if (err) {
        console.log('error in callback');
        console.log(err);
       }
       console.log('success');
       console.log(data);
      });
    });
}



MotorController.create = function (req, res) {
    console.log(req.body.picFront);
    var file1 = req.files.picFront.name;
    var name1 = passwordHash.generate(file1.split(".")[0])+"."+file1.split(".")[1];
    var file2 = req.files.picBack.name;
    var name2 = passwordHash.generate(file2.split(".")[0])+"."+file2.split(".")[1];
    var file3 = req.files.picPlate.name;
    var name3 = passwordHash.generate(file3.split(".")[0])+"."+file3.split(".")[1];

    var datamorcyc = {
        motorID: req.body.ID,
        name: req.body.Name,
        brand: req.body.Brand,
        latlng: {
            lat: req.body.Lat,
            lng: req.body.Lng
        },
        plate: req.body.plate,
        pictures: {
            picFront: name1,
            picBack: name2,
            picPlate: name3
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
            Motorcycle.findOne({motorID: req.body.ID}).exec(function(err,morcyc){
                req.files.picFront.name = name1;
                req.files.picBack.name = name2;
                req.files.picPlate.name = name3;
                uploadToS3(req.files.picFront,morcyc["_id"]);
                uploadToS3(req.files.picBack,morcyc["_id"]);
                uploadToS3(req.files.picPlate,morcyc["_id"]);
            });
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
    var latlng = {
        lat : lst[29].split(",")[0],
        lng : lst[29].split(",")[1]
    }
    console.log(lst);
    Motorcycle.findById({ _id: req.body.morcycID }).update({ history: lst, latlng : latlng }, function (err, result) {
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
    res.render("../views/repair", { id: id, userId:req.session.userId });
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


MotorController.getmotorcycle = function(req,res){
    Motorcycle.findById({_id:req.params.id}).exec(function(err,morcyc){
        if(err){
            res.send(err);
        }else{
            res.render("../views/bikestatus.ejs",{ morcyc : morcyc });
        }
    });
}

MotorController.updateCode = function (req, res) {
    console.log(req.body);
    var latlng = {
        lat : req.body.lat,
        lng : req.body.lng
    }
    Motorcycle.findById({ _id: req.params.id }).update({code : req.body.code, latlng : latlng},function(err,morcyc){
        if(err) res.send(err);
        else{
            res.send(true);
        }
    });
}
MotorController.startengine = function(req,res){
    res.render("../views/start",{mId : req.session.morcycId});
}
MotorController.changelatlng = function(req,res){
    Motorcycle.findById({ _id : req.body.morcycID }).update({ latlng : req.body.latlng},function(err,moto){
        if(err) res.send(err);
        else res.send(true);
    });
}
module.exports = MotorController;