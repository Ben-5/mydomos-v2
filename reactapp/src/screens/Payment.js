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
    console.log(props.rdx.currentPayment, props.rdx.currentUser)
    const handleSubmit = async () => {

        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });

        if (error) {
            console.log('[error]', error);
        } else {
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
        }
    };

    // if (!props.rdx.currentUser){
    //     return <Redirect to='/signin'/>
    // } else {
        return (
            <div style={{backgroundColor: '#7795f8'}}>
                 <CardElement  
                    onChange={(e) => {
                        setError(e.error);
                        setCardComplete(e.complete);
                    }} 
    
                    options={{
                    iconStyle: 'solid',
                    style: {
                        base: {
                        iconColor: '#c4f0ff',
                        color: '#fff',
                        fontWeight: 500,
                        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                        fontSize: '16px',
                        fontSmoothing: 'antialiased',
                        ':-webkit-autofill': {color: '#fce883'},
                        '::placeholder': {color: '#87bbfd'},
                        },
                        invalid: {
                        iconColor: '#ffc7ee',
                        color: '#ffc7ee',
                        },
                        },
                        }}
                    />
                    <Button onClick={()=>handleSubmit()} buttonTitle='Payer'/>
            </div>              
        );
    // }
}


function Payment(props) {
    return (
        <div className='payement-page'>
            <Elements stripe={stripePromise}>
                <PaymentForm rdx={props.state} />
            </Elements>
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