import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Form from '../components/Form';

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

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (

        <Form
            containerClassName='sign-form'            
            inputList={[                
                {name: 'email', placeholder:'email'},                
                {name: 'password',placeholder:'mot de passe', type:'password'}                
            ]}                

            btn={[{title: "Se connecter"}]}                

            linkList={[                
                {title: "J'ai perdu mes clés !", link: '/home'},                
                {title: "Je n'ai pas encore les clés", link: '/signup'},                
            ]}                

            getRes={e=>console.log(e)}
        />               
    );
}


function Payment() {
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
                        <PaymentForm />
                    </Elements>
                </div>
            </div>  
    );
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser }
}

export default connect(
    mapStateToProps,
    null,
)(Payment);