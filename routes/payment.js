var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_Udus5asq0LwzZrgqRkHf9EhY00BvZTBg5p');

/* GET home page. */
router.post('/getCart', async function(req, res, next) {





    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items: [{
    //       name: 'T-shirt',
    //       description: 'Comfortable cotton t-shirt',
    //       images: ['https://example.com/t-shirt.png'],
    //       amount: 500,
    //       currency: 'usd',
    //       quantity: 1,
    //     }],
    //     success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    //     cancel_url: 'https://example.com/cancel',
    // });
  
  
  
  res.json({res: true});
});

module.exports = router;
