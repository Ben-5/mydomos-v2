var express = require('express');
var router = express.Router();

var orderModel = require('../models/order');


//Ajouter une nouvelle commande
router.post('/neworder', async function(req, res, next) {


    console.log('req.body :', req.body);


    // var newOrder = await new orderModel ({
    //   orderNumber: req.body.orderNumber,
    //   orderDate:  req.body.orderDate,
    //   orderNbTickets: req.body.orderNbTickets,
    //   orderTotal: req.body.orderTotal,
    //   orderVisits: req.body.orderVisits,
    //   }
    // );
  
    // var orderSaved = await newOrder.save(); 

    // var userOrder = await UserModel.findOne(
    //   { _id: req.body._id },
    //   { $set: { userOrders : orderSaved}}
    // )
  
    res.json({result: true}); 
  })
module.exports = router;