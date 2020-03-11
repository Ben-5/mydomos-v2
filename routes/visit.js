var express = require('express');
var router = express.Router();

var visitModel = require('../models/visit');

router.get('/results', async function(req, res, next) {
  
  // var searchParams = {isRmv: false, };
  var visits = await visitModel.find();

  res.json({result: true, list: visits}); 
});

router.post('/addvisit', async function(req, res, next) {

  // generate a ref
  var nbCity = await visitModel.countDocuments({}, function (err, count) {
    if (err) {res.json({result: false, error: err})} else {return count};
  });
  var newRef = await req.app.locals.visitRefForm(req.body.country, req.body.zip, nbCity + 1);
  
  //push to db the new visit
  var newVisit = await new visitModel ({
    ref:        newRef,
    title:      req.body.title,
    desc:       req.body.desc,
    place:      req.body.place,
    host:       req.body.host,
    pics:       req.body.pic,
    cover:      req.body.cover,
    rate:       -1,
    isRmv:      false,
    address:    {
      street: req.body.street,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
  });
  var visitSaved = await newVisit.save();

  res.json({result: true, saved: visitSaved});
});

//Ajouter des nouveaux créneaux  à une visite
router.post('/addinfo', async function(req, res, next) {
  
  var visit = await visitModel.updateOne(
    { ref: req.body.ref },
    {
      $addToSet: { 'info': {
        date: req.body.date,
        time : req.body.time,
        price: req.body.price,
        duration: req.body.duration,
        lang: req.body.lang,
        opt: req.body.opt,
        stock: req.body.stock,
        maxStock:req.body.maxStock} },
    }
  );

  res.json({result: true, visitInfo: visit}); 
});

//Récupérer les infos d'une visite
router.get('/visitpage/:id', async function(req, res, next) {
  
  var visit = await visitModel.find({_id : req.params.id});

  res.json({result: true, visit : visit}); 
});

//Afficher les créneaux d'une visite
router.get('/book/:id', async function(req, res, next) {
  
  var visit = await visitModel.find({_id : req.params.id});

  res.json({result: true, visit : visit}); 
});

router.get('/slidernow', async function(req, res, next) {

  var visit = await visitModel.find({slider : "now"});

  res.json({result: true, list : visit}); 
});

router.get('/slidercity', async function(req, res, next) {

  var visit = await visitModel.find({slider : "city"});

  res.json({result: true, list : visit}); 
});

module.exports = router;
