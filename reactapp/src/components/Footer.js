import React, { useState } from 'react';
import { ExternalLink } from 'react-external-link';

import {Col, Row} from 'antd';
import Input from '../components/Input';
import OkButton from '../components/OkButton';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';

export default function Footer() {
    const [newInput, setNewInput] = useState('');

    return (
    <footer>
        <div className="newsletter-container">
            <Row>
                <Col className="newsletter" xs ={{span:24, order:1}} sm ={{span:24, order:1}} md ={{span:24, order:1}} lg ={{span:12, order:1}}>
                    <Title title="Soyez exclusifs !"/>
                    <Subtitle subtitle="Abonnez-vous à notre newsletter pour découvrir les nouvelles visites et offres exclusives en priorité !"/>
                    <div className="newsletter-form" >
                            <Input onChange={e=>setNewInput(e)} placeholder="email"/>
                            <OkButton/>
                    </div>
                </Col>
                <Col className="legs-container" xs ={{span:24, order:2}} sm ={{span:24, order:2}} md ={{span:24, order:2}} lg ={{span:12, order:2}}>
                    <img src="../legs.png" className="legs" alt="legs" /> 
                </Col>
            </Row>
        </div>    
        <div className= "footer-container">
            <div className= "socials-container">
                <ExternalLink href="//facebook.com/"><img src="../facebook.png" className="socials-button" alt="facebook"/></ExternalLink>
                <ExternalLink href="//instagram.com/mydomos/"><img src="../instagram.png" className="socials-button" alt="instagram"/></ExternalLink>
                <ExternalLink href="//linkedin.com/"><img src="../linkedin.png" className="socials-button" alt="flinkedin"/></ExternalLink>
            </div>
            <div className="footer-links">
                <h3 className="footer-title">À propos</h3>
                <h3 className="footer-title">Contact</h3>
                <h3 className="footer-title">CGU/CGV</h3>
            </div>
            <div className="copyright">
                <img src="../sleeping.png" className="sleep" alt="sleep" />
                <h4 className="footer-title">© MYDOMOS</h4>
            </div>
        </div>
        <div className="navigation-menu-padding"></div>
    </footer>
        );
    }