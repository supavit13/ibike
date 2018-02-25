var mongoose = require("mongoose");
var User = require("../models/User");
var bcrypt = require('bcrypt');
var LoginController = {};
LoginController.authenticate = function(req,res){
    User.findOne({ email : req.body.email }).exec(function(err,user){
        if(err){
            res.redirect("/");
        }else if(user==null){
            var err = new Error('User not found.');
            err.status = 401;
            res.redirect("/");
        }
        
        console.log("pass");
        if(user!=null){
            bcrypt.compare(req.body.password,user.password,function(err,result){
                if(user.pass == "Requestor"){
                    req.session.userId = user._id;
                    res.redirect("/");
                }
                else if(user.pass == "Admin" && result == true){
                    req.session.userId = user._id;
                    res.redirect("/admin");
                }
                else if(user.pass == "User" && result == true){
                    req.session.userId = user._id;
                    // console.log("pass session");
                    res.redirect("/showbike");
                }else {

                }
            }) 
        }
        
    });
}

LoginController.checksessions = function(req,res){
    User.findOne({ _id : req.session.userId }).exec(function(err,user){
        if(err){
            res.render("../views/menu");
        }
        else if(user==null){
            res.render("../views/menu");
        }
        else if(user['pass']=="Admin"){
            res.redirect("/admin");
        }
        else if(user['pass']=="User"){
            res.redirect("/showbike");
        }
        else{
            res.render("../views/menu");
        }

    });
}
LoginController.logout = function(req,res){
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
}

module.exports = LoginController;