import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import SliderNow from '../components/SliderNow';
import Navigation from '../components/Navigation';


import {Row, Col} from 'antd';

function Basket(props){

    const [goToPayment, setGoToPayment] = useState(false);

    const [basketList, setBasketList] = useState([]);

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setBasketList(props.visitInBasket);
    }, [props.visitInBasket]);


    var handleCheckout = async (total) => {
        var total = 0;
        for (var i=0;i<basketList.length;i++){
            total = total + basketList[i].price * basketList[i].quantity;
        }

        var rawRes = await fetch('/checkout/stripe', {
            method: 'POST',
            headers: {'Accept':'application/json', 'Content-Type':'application/json'},
            body: JSON.stringify({amount: total * 100}),
        });
        var response = await rawRes.json();
        if (response.res) {props.addCurrentPayment(response.stripeRes); setGoToPayment(true);}
    }

    //Formater la date
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

    //Afficher un texte différent si le panier est vide
    var subVisit;
    var sliderTitle;

    if(!basketList[0]){
        subVisit = "Vous n'avez aucune visite dans votre sélection.";
        sliderTitle = "Pourquoi ne pas commencez par celles-ci ?";
    } else {
        subVisit = "Réservez des visites exclusives de maisons historiques privées animées par des propriétaires passionés";
        sliderTitle = "Découvrez d'autres lieux";
    }
    
    //Afficher le total du panier
    let total 
    let totalCmd = 0
    for (var i = 0; i < basketList.length; i++ ) {
       totalCmd = basketList[i].price * basketList[i].quantity + totalCmd
       total = "Total : " + totalCmd + " €"
    }

    if (goToPayment) {
        return <Redirect to='/stripe/checkout' />
    }
    return(

    <div className="background">
    <Header/>

        <div  className="body-screen">

            <Row className= "main-caption">

                <Col className= "main-caption-text" xs ={{span:24, order:2}} sm ={{span:24, order:2}} md ={{span:24, order:2}} lg ={{span:12, order:1}} xl ={{span:12, order:1}}>
                    <Title title="Votre sélection"/>
                    <Subtitle subtitle={subVisit}/>
                </Col>

                <Col className="main-caption-image" xs ={{span:24, order:1}} sm ={{span:24, order:1}} md ={{span:24, order:1}} lg ={{span:12, order:2}} xl ={{span:12, order:2}}>
                    <img src="../fan.png" className="fan" alt="fan" />  
                </Col>

            </Row>


        {/* ---->ROW className="success-container" A MAPPER AVEC BDD<---- */}

        {basketList.map((order, i) => (

            <Row key={i} className="success-container">

                <Col xs={{span:24}}>
                <Subtitle subtitle={`${order.title} - ${new Date(order.date).toLocaleDateString('fr-FR', options)}`} />
                    <Col style={{borderTop :"solid 1px #B5ACAC"}}>
                        
                    </Col>
                        <Row style={{paddingTop: '3vmin', paddingBottom: '3vmin'}} justify="space-between" align='middle'>
                            <Text text={order.time} />
                            <Text text={`${order.price} € par personne`}/>
                            {order.quantity === 1 ? <Text text={`${order.quantity} place`}/> : <Text text={`${order.quantity} places`}/>} 
                            <Text text={`${order.price * order.quantity} €`}/>
                            <Text onClick={()=>props.rmvFromCart(i)} isLink={true} text={`Supprimer`} />
                        </Row>
                </Col>
                
            </Row>

        ))}

            <Row align="middle" className="menu-basket">
                <p className="totalCmd">{total}</p>
            </Row>

        {/* start partie remplacée par className=fixed-menu-visit  */}
        
        <Row align="middle" className="menu-basket">
        { !basketList[0] ?  "" : <Button buttonTitle="Valider la commande" onClick={()=>handleCheckout()}/>}
        </Row>
        
    </div>


            {/*START slider section */}
            <div style={{paddingBottom: '8vmin', paddingTop: '8vmin'}} className="paris-visits">
                <h3 className="sliderTitle">{sliderTitle}</h3>
                <SliderNow />
                <div style={{paddingLeft: '2vmin', marginTop: '7vmin'}}>
                    <Button link='/results' buttonTitle="Voir plus"/>
                </div>
            </div>
            {/* --------> END slider section  */}


        <Footer/>

        {/*  start partie mobile-fixed qui remplace className=menu-visit  */}

        {!basketList[0] ? 
        <Navigation/>
        :
        <Row className="fixed-menu-success">
            <p className="totalCmdMobile">{total}</p>
            <Button to='/signin' buttonTitle="Valider la commande" onClick={()=>handleCheckout()}/>
        </Row>
        }

        {/*  end partie mobile-fixed qui remplace className=menu-visit  */}
        
    </div>  
    
    
    )
}

function mapStateToProps(state) {
    return {visitInBasket: state.visit}
}

function mapDispatchToProps(dispatch){
    return {
      rmvFromCart: function(index){
        dispatch({type: 'rmvVisit', toRmv: index});
      },
      addCurrentPayment: function(intent){
        dispatch({type: 'addCurrentPayment', toAdd: intent});
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)