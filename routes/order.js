var express = require('express');
var router = express.Router();

var orderModel = require('../models/order');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

//Ajouter une nouvelle commande
router.post('/neworder', async function(req, res, next) {
  
    var newOrder = await new orderModel ({
      orderNumber: req.body.orderNumber,
      orderDate:  req.body.orderDate,
      orderNbTickets: req.body.orderNbTickets,
      orderTotal: req.body.orderTotal,
      orderVisits: req.body.orderVisits,
      }
    );
  
    var orderSaved = await newOrder.save(); 
  
    res.json({result: true, order: orderSaved}); 
  })
module.exports = router;