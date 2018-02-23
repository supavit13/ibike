var mongoose = require("mongoose");
var Motorcycle = require("../models/Motorcycle");
var moment = require("moment");
var MotorController = {};

MotorController.create=function( req , res )
{
    var datamorcyc={
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
    var motorcyc= new Motorcycle(datamorcyc);
    console.log(motorcyc);
    motorcyc.save(function (err) {
        if (err) {
            console.log(err);
            res.render("../views/morcyc.ejs");
        } else {
            console.log("Successfully created a MotorcycDATA.");
            res.redirect("/listmotorcycle");
        }
    });


}
MotorController.morcycList = function(req,res){
    Motorcycle.find({}).exec(function(err,morcyc){
        if(err){
          console.log("Error:",err);  
        } 
        else{
            // res.send(users);
            res.render("../views/admin/listmotorcycle",{morcyc:morcyc});
        }
    });
};

module.exports = MotorController;