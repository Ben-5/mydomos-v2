var express = require('express');
var router = express.Router();

var orderModel = require('../models/order');


//Ajouter une nouvelle commande
router.post('/neworder', async function(req, res, next) {

    var newOrder = await new orderModel ({
      orderRef:       await req.app.locals.orderRefForm(),
      orderDate:      new Date(),
      orderTotal:     req.body.total,
      orderUser:      req.body.userId,
      orderVisits:    req.body.order,
      }
    );
    var orderSaved = await newOrder.save(); 
  
    res.json({result: true, response: orderSaved});
  })
module.exports = router;