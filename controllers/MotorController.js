var mongoose = require("mongoose");
var Motorcycle = require("../models/Motorcycle");
var Zone = require("../models/MotorcycleZone");
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
            res.redirect("/admin/listmotorcycle");
        }
    });


}


MotorController.plotToMap = function(req,res){
    var zone;
    Zone.find({}).exec(function(err,zs){
        if(err) console.log(err);
        else zone = zs;
    });
    console.log(zone);
    Motorcycle.find({}).exec(function(err,morcyc){
        if(err){
          console.log("Error:",err);  
        } 
        else{
            // res.send(users);
            
            res.render("../views/showbike",{morcyc:morcyc,zone:zone});
        }
    });
}


module.exports = MotorController;