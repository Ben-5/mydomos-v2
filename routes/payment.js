var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_Udus5asq0LwzZrgqRkHf9EhY00BvZTBg5p');

/* GET home page. */
router.post('/getCart', async function(req, res, next) {

  console.log(req.body);
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

    //PAYMENT

    // stripeCard = [];

    // for (var i = 0; i < req.session.dataCardBike.length; i++) {
    //     stripeCard.push({
    //         name: req.session.dataCardBike[i].name,
    //         amount: req.session.dataCardBike[i].price * 100,
    //         currency: 'eur',
    //         quantity: req.session.dataCardBike[i].quantity,
    //     })
    // }
    // console.log(stripeCard)
    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items: stripeCard,
    //     success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
    //     cancel_url: 'http://localhost:3000/cancel',
    // });

    // sessionStripeID = session.id;

    // //end PAYMENT


    // res.render('shop', { dataCardBike: req.session.dataCardBike, sessionStripeID });
  
  
  
  res.json({res: true});
});

module.exports = router;
