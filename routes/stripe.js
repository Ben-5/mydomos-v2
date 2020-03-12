var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_Udus5asq0LwzZrgqRkHf9EhY00BvZTBg5p');

/* GET home page. */
router.post('/stripe', async function(req, res, next) {

  var stripeCart = req.body.orders;
  console.log('stripeCart :', stripeCart);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body.orders,
    success_url: 'http://localhost:3001/home',
    cancel_url: 'http://localhost:3001/basket',
  });

  sessionStripeID = session.id;
  
  res.json({res: true, sessionId: sessionStripeID});
});

module.exports = router;
