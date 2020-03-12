import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

//component
import Button from '../components/Button';

//stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//Stripe components
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

//Stripe !! PUBLIC !! key (start with "pk_")
const stripePromise = loadStripe('pk_test_D6ypA64RDU9RifwvbkQtGMKm00N7EcDL4L');



function PaymentForm(props) {
    const stripe = useStripe();
    const elements = useElements();

    const [cardComplete, setCardComplete] = useState(false);
    const [error, setError] = useState(false);
    const [succed, setSucceed] = useState(false);

    //Ref de l'order a return
    const [orderRef, setOrderRef] = useState(null);


    const handleSubmit = async () => {

        const {error} = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });

        if(!error) {
            const result = await stripe.confirmCardPayment(`${props.rdx.currentPayment.client_secret}`, {
                payment_method: {
                  card: elements.getElement(CardElement),
                  billing_details: {
                    "address": {
                      "city": props.rdx.currentUser.userCity,
                      "country": 'FR',
                      "line1": props.rdx.currentUser.userAdress,
                      "line2": null,
                      "postal_code": props.rdx.currentUser.userZIP,
                      "state": null
                    },
                    "email": props.rdx.currentUser.userEmail,
                    "name": `${props.rdx.currentUser.userLastName} ${props.rdx.currentUser.userFirstname}`,
                    "phone": null,
                  },
                }
            });

            if (result.error) {
                console.log(result.error)
            } else {
                if (result.paymentIntent.status === 'succeeded') {

                    //AFTER PAYMENT PROCEED
                    //add the order to db

                    var basket = props.rdx.visit;
                    var orderList = [];
                    for (var i=0;i<basket.length;i++){
                        orderList.push({
                            quantity: basket[i].quantity,
                            visitId: basket[i].visitId,
                            slotId: basket[i].infoId,
                            cover: basket[i].img,
                            title: basket[i].title,
                            price: basket[i].price,
                        });
                    }

                    var rawRes = await fetch('/order/neworder', {
                        method: 'POST',
                        headers: {'Accept':'application/json','Content-Type':'application/json'},
                        body: JSON.stringify({order: orderList, userId: props.rdx.currentUser.userRef, total: result.paymentIntent.amount}),
                    });


                    // setSucceed(true);
                }
            }
        }
    };

    if (!props.rdx.currentUser || !props.rdx.currentPayment){
        return <Redirect to='/signin'/>
    } else if (succed) {
        return <Redirect to={`/success/${orderRef}`}/>
    } else {
        return (
            <div className="stripe-main">
                <div className="stripe-screen">
                 <CardElement  
                    onChange={(e) => {
                        setError(e.error);
                        setCardComplete(e.complete);
                    }} 
    
                    options={{
                    iconStyle: 'solid',
                    style: {
                            base: {
                                iconColor: '#b1abab',
                                color: '#b1abab',
                                fontWeight: 500,
                                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                                fontSize: '20px',
                                fontSmoothing: 'antialiased',
                                ':-webkit-autofill': {color: '#3d3d3d'},
                                '::placeholder': {color: '#b1abab'},
                            },
                            invalid: {
                                iconColor: '#791212',
                                color: '#791212',
                            },
                        },
                        }}
                    />
                    </div>

                    <Button onClick={()=>handleSubmit()} buttonTitle='Payer'/>
            </div>              
        );
    }
}


function Payment(props) {
    return (
            <div className='payement-page'>
                <header className="header-container">
                    <div className="header-logo">
                        <img src="../logo.png" className="logo" alt="logo" />
                        <div className="header-title">MYDOMOS</div>
                    </div>
                </header>
                <div className='body-screen-stripe'>
                    <img src="../card.png" className="card-picto" alt="card" />
                    <Elements stripe={stripePromise}>
                        <PaymentForm rdx={props.state} />
                    </Elements>
                </div>
            </div>  
    );
}

function mapStateToProps(state) {
    return {state: state}
}

export default connect(
    mapStateToProps,
    null,
)(Payment);