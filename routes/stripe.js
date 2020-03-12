var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_Udus5asq0LwzZrgqRkHf9EhY00BvZTBg5p');

/* GET home page. */
router.post('/stripe', async function(req, res, next) {

  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'eur',
    metadata: {integration_check: 'accept_a_payment'},
  });

  res.json({res: true, stripeRes: paymentIntent});
});

module.exports = router;
