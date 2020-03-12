import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {Redirect} from 'react-router-dom';

import Header   from '../components/Header';
import Form     from '../components/Form';
import Navigation     from '../components/Navigation';


function Signin(props) {

    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=> {
        window.scrollTo(0, 0)
        if (props.currentUser) { setIsLogged(true) }
        else {setIsLogged(false)}
    }, [setIsLogged]);

    var handleRes = (attempt) => {
        if (attempt.result) {
            props.addUser(attempt.user);
            setIsLogged(true);
        }
    }


    if (isLogged) {
        if (props.currentPayment) {
            return (
                <Redirect to='/stripe/checkout' />
            );
        } else {
            return (
                <Redirect to='/account' />
            );
        }
    } 
    return (
        <div className='background'>
            
            <Header />


            <div className='body-screen-sign'>

                <div className="sign-body">
                
                    <div className="keyhole-animation">
                        <img src="../keyhole.png" className="keyhole" alt="keyhole" />
                        <img src="../cover.png" className="cover" alt="cover" />
                    </div>

                    <h1 className="sign-body-title">Connexion</h1>  

                    <Form
                        containerClassName='sign-form'
                        route = 'users/signin'
                        inputList={[
                            {name: 'email', placeholder:'email'},
                            {name: 'password',placeholder:'mot de passe', type:'password'}
                        ]}

                        btn={[{title: "Se connecter"}]}

                        linkList={[
                            {title: "J'ai perdu mes clés !", link: '/home'},
                            {title: "Je n'ai pas encore les clés", link: '/signup'},
                        ]}

                        getRes={e=>handleRes(e)}
                    />
                </div>
            </div>
            
            <div className="navigation-menu-signinup"></div>
            
            <Navigation/>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        addUser: function(user) { 
          dispatch( {type: 'addUser', toAdd: user} ) 
      }
    }
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser, currentPayment: state.currentPayment }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Signin);