var mongoose = require("mongoose");
var User = require("../models/User");
var moment = require("moment");
var nodemailer = require('nodemailer');
var passwordHash = require('password-hash');
var generator = require('generate-password');
var bcrypt = require('bcrypt');
var Zone = require("../models/MotorcycleZone");
const AWS = require('aws-sdk');
const BUCKET_NAME = 'morcyc4you';
const IAM_USER_KEY = 'AKIAJBYSJVCFVHRX77XQ';
const IAM_USER_SECRET = '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';
var UserController = {};

function uploadToS3(file,location) {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
    });
    s3bucket.createBucket(function () {
      var params = {
       Bucket: BUCKET_NAME,
       Key: "user/"+location+"/"+file.name,
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
UserController.create = function (req, res) {
    var file1 = req.files.picFront.name;
    var name1 = passwordHash.generate(file1.split(".")[0])+"."+file1.split(".")[1];
    var file2 = req.files.picBack.name;
    var name2 = passwordHash.generate(file2.split(".")[0])+"."+file2.split(".")[1];
    var file3 = req.files.picOwn.name;
    var name3 = passwordHash.generate(file3.split(".")[0])+"."+file3.split(".")[1];
    
    var schema = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password,
        wallet : "50",
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
            picFront: name1,
            picBack: name2,
            picOwn: name3
        },
        pass: req.body.pass
    }
    console.log(req.files.picOwn);
    
    
    
    var userid;
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
                userid=user["_id"];
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
                    subject: '[Morcyc4you]Confirm your email',
                    text: 'Please click this link for confirm your email https://morcyc4you.ga/users/'+user["_id"]+"/verify"
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
            User.findOne({email:req.body.email}).exec(function(err,user){
                req.files.picFront.name = name1;
                req.files.picBack.name = name2;
                req.files.picOwn.name = name3;
                uploadToS3(req.files.picFront,user["_id"]);
                uploadToS3(req.files.picBack,user["_id"]);
                uploadToS3(req.files.picOwn,user["_id"]);
            })
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

UserController.getuser=function(req,res){
    User.findOne({ _id:req.params.id }).exec(function(err,user){
        if(err){
            res.redirect("/");
        }else{
            console.log(user);
            res.render("../views/profile.ejs",{user:user});
        }
    });
}
UserController.historyUser = function(req,res){
    User.find({ _id : req.session.userId}).exec(function(err,hitoryuser){
        console.log(hitoryuser[0]['historyUser']);
        if (err) console.log(err);
        else if(hitoryuser[0]['historyUser']!=null){
            res.render("../views/historyUser" , { Hisuser : hitoryuser[0] } );
        }else{
            res.redirect("/");
        }
    });
}
UserController.riding=function(req,res){
    Zone.find({}).exec(function (err, zone) {
        if (err) console.log(err);
        else {
            var area = {};
            for(var i=0;i<zone[0]['zone'].length;i++){
                area[i] = {lat : zone[0]['zone'][i][0] ,lng : zone[0]['zone'][i][1]};
            }
            console.log(area);
            res.render("../views/riding", { zone : zone, morcycId : req.session.morcycId,mId : req.session.morcycId , userId :  req.session.userId } );
        }    
    });
}

UserController.getemail = function(req,res){
    User.findOne({email : req.body.email}).exec(function(err,user){
        if(err) res.send(err);
        var userid=user["_id"];
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
            subject: '[Morcyc4you]Confirm your email',
            text: 'Please click this link for confirm your email https://morcyc4you.ga/users/'+user["_id"]+"/verify"
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                
                console.log('Email sent: ' + info.response);
                // res.send('Email sent: ' + info.response);
            }
        });
    });
    res.send(true);
}
UserController.verify = function(req,res){
    User.findOne({ _id : req.params.id }).exec(function(err,user){
        if(user['pass']=="Requestor"){
            User.where({ _id: req.params.id }).update({ pass: "PreUser" }, function (err, result) {
                if (err) res.send(err);
                else res.render('../views/verify', { user: result });
            });
        }else{
            res.redirect("/");
        }
    });
}

UserController.forgetPassword = function(req,res){
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    bcrypt.hash(password, 8, function(err, hash) {
        User.where({email:req.body.email}).update({ password : hash },function(err,result){
            if(err) res.send(err);
            else{
                console.log(password);
                User.findOne({email:req.body.email}).exec(function(error,user){
                    if(err) res.send(error);
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
                        subject: '[Morcyc4you]You got a new password',
                        text: 'you password is '+password+' , you should change password for security'
                    };
            
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            res.send(error);
                        } else {
                            
                            console.log('Email sent: ' + info.response);
                            res.send(true);
                            // res.send('Email sent: ' + info.response);
                        }
                    });
                });
                
            }
        });
    });
    
    
    
}
UserController.changepassword = function(req,res){    
    bcrypt.hash(req.body.password,8,function(err,hash){
        User.where({ _id : req.session.userId}).update({ password : hash },function(err,result){
            if(err) res.send(err);
            else res.send(true);
            
        });

    });
}
UserController.topup = function(req,res){
    User.where({ _id : req.params.id }).update({ wallet : req.params.money },function(err,result){
        if(err) console.log(err);
        else res.send("TopUp Successfully!!");
    });
}
UserController.getwallet = function(req,res){
    User.findOne({ _id : req.session.userId}).exec(function(err,user){
        console.log(user);
        console.log(user.wallet);
        if(err) console.log(err);
        else res.send(user.wallet);
    });
}
module.exports = UserController;