import React from 'react';

import {Col, Row} from 'antd';
import {Link} from 'react-router-dom'

import Header from '../components/Header';
import Text from '../components/Text';
import Title from '../components/Title';

function Success(){



return(
<div className="background">
  <Header/>

    <div  className="body-screen">
        <Row className="success-container">
            <Col align="middle" >
                <Title title='Votre visite est réservée !'/>
                {/* IMAGE A REMPLACER PAR BEN */}
                <img src="../success.png" className="success" alt="success"/>
                <Text text="Vous allez recevoir un email de confimation." />
            </Col>
        </Row>


    </div>

     {/*  start partie mobile-fixed qui remplace className=menu-visit  */}
     <div>
        <Row align="middle" justify="space-around"  className="fixed-menu-success">
            <Link to="/home" className="nav-button"><img src="../picto-search.png" className="nav-picto" alt="picto"/><h6 className="picto-title">Home</h6></Link>
            <Link to="/results" className="nav-button"><img  src="../picto-bag.png" className="nav-picto" alt="picto" /><h6 className="picto-title">explorer</h6></Link>       
            <Link to="/account" className="nav-button"><img src="../picto-key.png" className="nav-picto" alt="picto"/><h6 className="picto-title">Mon compte</h6></Link>
        </Row>
     </div>
     </div>
    )
}

export default Success;