var express = require('express');
var router = express.Router();

//crypto.js
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uid2 = require("uid2");

//db models
var UserModel = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', async function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var mail = req.body.email;
  var pswd = req.body.password;

  var user = await UserModel.findOne({
    userEmail: mail
  });

  if(!user) {
    var salt = uid2(32);
    var newUser = new UserModel ({
    userRef: await req.app.locals.userRefForm(),
    userLastname: lastname,
    userFirstname: firstname,
    userEmail: mail,
    salt: salt,
    userPassword: SHA256(pswd + salt).toString(encBase64),
    token: uid2(32),
    userAvatar : "avatarMedusa",
    userBirthday: "",
    userAddress: "",
    userZIP: "",
    userCity: "",
    userCountry: "",
    userAvatar:"avatarMedusa",
    });

    var userSaved = await newUser.save();
    
    //result
    res.json({result: true, user: userSaved});
  } 
  
  else {
    //result
    res.json({result: false, user: user}); 
  }
});

router.post('/signin', async function(req, res, next) {
  var mail = req.body.email;
  var pswd = req.body.password;
  await UserModel.findOne({ userEmail: mail }).exec(function (err, user) {
    if (user) {
      var hash = SHA256(pswd + user.salt).toString(encBase64);
      if (user.userPassword === hash) {
        res.json({result: true, user: user});
      } else {
        res.json({result: false, exist: true});
      } 
    } else {
      res.json({result: false, exist: false});
    }
  });
});

router.post('/changeavatar', async function(req, res, next) {

  var avatar = await UserModel.updateOne(
    { _id: req.body._id },
    { $set: { userAvatar : req.body.userAvatar}}
  );

  
  res.json({result: true, avatarSaved: avatar});
});

router.post('/updateInfo', async function(req, res, next) {

  var info = await UserModel.updateOne(
    { _id: req.body._id},
    { $set: { 
      userLastname : req.body.userLastname,
      userFirstname : req.body.userFirstname,
      userEmail : req.body.userEmail,
      userBirthday : req.body.userBirthday,
      userAddress : req.body.userAddress,
      userZIP : req.body.userZIP,
      userCity : req.body.userCity,
      userCountry: req.body.userCountry
    }}
  );

  res.json({result: true, userSaved: info});
});

module.exports = router;