import React from 'react';


import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import SliderNow from '../components/SliderNow';
import Navigation from '../components/Navigation';


import {Row, Col} from 'antd';

export default function Success(props){

    return(

    <div className="background">
    <Header/>

        <div  className="body-screen">

            <Row className= "main-caption">

                <Col className= "main-caption-text" xs ={{span:24, order:2}} sm ={{span:24, order:2}} md ={{span:24, order:2}} lg ={{span:12, order:1}} xl ={{span:12, order:1}}>
                    <Title title="Votre visite est réservée !"/>
                    <Subtitle subtitle={`Numéro de commande: "${props.match.params.ref}"`}/>
                    <Subtitle subtitle="Vous allez recevoir un email de confimation."/>
                </Col>

                <Col className="main-cake-image" xs ={{span:24, order:1}} sm ={{span:24, order:1}} md ={{span:24, order:1}} lg ={{span:12, order:2}} xl ={{span:12, order:2}}>
                    <img src="../cake.png" className="cake" alt="cake" />  
                </Col>

            </Row>

        </div>

{/*START slider section */}

        <div className="breaking-visits">
            
            <h3 className="sliderTitle">Découvrez d'autres lieux</h3>
                <SliderNow />
                    <div style={{paddingLeft: '2vmin', marginTop: '7vmin'}}>
                        <Button link='/results' buttonTitle="Voir plus"/>
                    </div>

        </div>
            

        {/*  end partie mobile-fixed qui remplace className=menu-visit  */}
        
        

        <Footer/>
        <Navigation/>
    </div>
    )
  }

