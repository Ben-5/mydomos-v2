import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {Redirect} from 'react-router-dom';

import Header   from '../components/Header';
import Form     from '../components/Form';
import Navigation from '../components/Navigation';

function Signup(props) {

    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=> {
        window.scrollTo(0, 0)
        if (props.currentUser) { setIsLogged(true) }
    }, [props.currentUser])


    var handleRes = (attempt) => {
        if (attempt.result) {
            props.addUser(attempt.user);
            setIsLogged(true);
        }
    }


    if (isLogged) {
        return (
            <Redirect to='/account' />
        );
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

                    <h1 className="sign-body-title">Inscription</h1>  

                    <Form
                        containerClassName='sign-form'
                        route = 'users/signup'
                        inputList={[
                            {name: 'firstname', placeholder: 'firstname'},
                            {name: 'lastname',placeholder:'lastname'},
                            {name: 'email',placeholder:'email'},
                            {name: 'password',placeholder:'password', type:'password'},
                            {name: 'confirmpassword',placeholder:'confirm password',type:'password', match: 3}
                        ]}

                        btn={[{title: "S'inscrire"}]}

                        linkList={[
                            {title: "J'ai déja les clefs !", link: '/signin'},
                        ]}

                        getRes={e=>handleRes(e)}
                    />
                </div>
            </div>
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
    return { currentUser: state.currentUser }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps,
)(Signup);