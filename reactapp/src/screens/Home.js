import React from 'react';
import {Col, Row} from 'antd';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Button from '../components/Button';
import LightButton from '../components/LightButton';
import SliderNow from '../components/SliderNow';
import SliderCity from '../components/SliderCity';


function App(props) {

    return (
      <div className="background">
        <Header/>
            <div className="body-screen">

{/* Accroche  */}

            <div className= "main-caption">
                <Row>

                <Col className= "main-caption-text" xs ={{span:24, order:2}} sm ={{span:24, order:2}} md ={{span:24, order:2}} lg ={{span:12, order:1}} xl ={{span:12, order:1}}>
                    <Title title="Voulez-vous visiter ?"/>
                    <Subtitle subtitle="Réservez des visites exclusives de maisons historiques privées animées par des propriétaires passionés"/>
                </Col>

                <Col className="main-caption-image" xs ={{span:24, order:1}} sm ={{span:24, order:1}} md ={{span:24, order:1}} lg ={{span:12, order:2}} xl ={{span:12, order:2}}>
                    <img src="../hand.png" className="hand" alt="hand" />  
                </Col>

                </Row>

            </div>
        </div>

 {/* Slider visites à la une  */}
            <div className="breaking-visits">
            
                <h3 className="sliderTitle">Visites à la une</h3>
                    <SliderNow />
                        <div style={{paddingLeft: '2vmin', marginTop: '7vmin'}}>
                            <Button link='/results' buttonTitle="Voir plus"/>
                        </div>

                    </div>

{/* Deuxieme accroche  */}
            
                <div className= "middle-caption">
                <Row>
                    <Col className="middle-caption-image" xs ={{span:24, order:1}} sm ={{span:24, order:1}} md ={{span:24, order:1}} lg ={{span:12, order:1}}>
                        <span className="middle-caption-background"><img src="../headphones.png" className="headphones" alt="headphones"/></span>  
                    </Col>
                    <Col className="middle-caption-text-button" xs ={{span:24, order:2}} sm ={{span:24, order:2}} md ={{span:24, order:2}} lg ={{span:12, order:2}}>
                        <div className="middle-caption-text">
                            <h1 className="middle-caption-title">Ceci n'est pas un musée</h1>
                            <Subtitle subtitle="Résérvéz des visites exclusives de maisons historiques privées animées par des propriétaires passionés"/>
                        </div>
                        <LightButton link='/about' buttonTitle="Découvrir"/>
                    </Col>
                </Row>
                </div>
            
{/* Slider 'En ce moment à Paris'  */}

        <div className="paris-visits">
            
            <h3 className="sliderTitle">En ce moment à Paris</h3>

            <SliderCity />

                    <div style={{paddingLeft: '2vmin', marginTop: '7vmin'}}>
                    <Button link='/results' buttonTitle="Voir plus"/>
                    </div>
                </div>
        

{/* Troisieme accroche  */}

        <div className= "bottom-caption">
                        <span className="bottom-caption-image"><img src="../closer.png" className="closer" alt="closer"/></span>  
                        <h1 className="closer-title">Y'a quelq'un ?</h1>
                        <LightButton link='/about' buttonTitle="Entrez !"/>
        </div>
      <Footer/>
      <Navigation/>
    </div>
    )
  }

export default App;