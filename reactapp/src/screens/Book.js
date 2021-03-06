import React, {useEffect, useState} from 'react';

import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Title from '../components/Title';
import Text from '../components/Text';
import Subtitle from '../components/Subtitle';
import Button from '../components/Button';

import { Row, Col, InputNumber } from 'antd';
import {connect} from 'react-redux'
  

function Book(props){

    const [visit, setVisit] = useState([]);
    const [info, setInfo] = useState([]);
    const [quantity, setQuantity] = useState([])
 
    useEffect(() => {
        window.scrollTo(0, 0)
        const getinfo = async() => {

            const response = await fetch(`/visit/book/${props.match.params._id}`)
            const data = await response.json()
            setVisit(data.visit[0])
            setInfo(data.visit[0].info)
            
            var toSendToState = [];

            for (var i=0;i<data.visit[0].info.length;i++) {
                toSendToState.push(1);
            }
            setQuantity(toSendToState);
        }
        getinfo()
    },[props.match.params._id])


    //Formater la date
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };


    //Aller au panier
    var goToBasket = () => {
        props.history.push("/basket")
    }

    var handleAdd = (visit, save, index) => {
        var toAdd = {
            visitId: visit._id,
            infoId: save._id,
            title: visit.title,
            date: save.date,
            time: save.time,
            price: save.price,
            quantity: quantity[index],
            stock: save.stock,
            img: visit.cover,
        }
        props.addVisitToBasket(toAdd);
    }
   
    var onChange = (value, index) => {
        var cpy = quantity;
        cpy[index] = value;
        setQuantity(cpy);
    }

    const order = info.map((data,i) => {

        const dataOptList = data.opt;
        let optList = dataOptList.map((opt, k) => {
                  
        var styleInclu = {};
                if(opt === "XXe" || opt === "XVIIIe" || opt === "Perle rare" || opt === "By nigth"){
                 styleInclu = {display: "none"};
                }  else{
                styleInclu = {paddingRight:15};
                }              
                return ( <div key={k}  style={styleInclu} className="book-time"><Text text={opt}/></div>)
            });
        return (
            <div key={i} className="grid-container-book" style={{borderTop :"solid 1px #B5ACAC"}}>

                <div className="grid-item-book book-date">
                <div className="book-date"><Text text={new Date(data.date).toLocaleDateString('fr-FR', options)}/></div>
                <div className="book-time"><Text text={data.time}/></div>
                <div className="book-time"><Text text={data.lang}/></div>
                <div className="book-time" style={{display:'flex'}}>
                {optList}
                </div>
              
                <div className="book-stock"><p className="book-stock">
                    { data.stock > 1 && data.stock < 4 ?  `Il ne reste que ${data.stock} places` : ""}
                    { data.stock === 1 ?  `Il ne reste que ${data.stock} place` : ""}
                </p></div>

                </div>
                <div className="grid-item-book book-ticket"><Text text={`${data.price} €`}/></div>
                <div>
                    <div className="grid-item-book book-ticket"><InputNumber min={1} max={data.maxStock} defaultValue={1} onChange={(e)=>onChange(e, i)} /></div>
                </div>
                    <div  className="grid-item-book book-button"><Button buttonTitle="Valider" onClick={ () => {handleAdd(visit, data, i); goToBasket()}}/></div>
                
        </div>
        )
        })

  return(

    <div className="background">
        <Header/>

        <div  className="body-screen">
        <Row className="main-caption">

            <Col className= "main-caption-text" xs ={{span:24, order:2}} sm ={{span:24, order:2}} md ={{span:24, order:2}} lg ={{span:12, order:1}} xl ={{span:12, order:1}}>
                <Title title="Faites votre choix !"/>
                <Subtitle subtitle="Réservez des visites exclusives de maisons historiques privées animées par des propriétaires passionés"/>
            </Col>

            <Col className="olive-animation" xs ={{span:24, order:1}} sm ={{span:24, order:1}} md ={{span:24, order:1}} lg ={{span:12, order:2}} xl ={{span:12, order:2}}>
                <img src="../hand-olive.png" className="hand-olive" alt="hand-olive" />
                <img src="../stick-olive.png" className="stick-olive" alt="stick-olive" />     
            </Col>

        </Row>

        {/* CALENDRIER */}
        {/* Composant calendrier ici */}

            
        {/* CRENEAU DU VISITE */}

        
            <div className="account-subtitle">
                <Subtitle subtitle={`Les visites disponibles pour ${visit.title}`}/>
            </div>
            {order}
                
        </div>

        <Footer/>
        <Navigation/>
    </div>


    )
}

function mapDispatchToProps(dispatch){
    return {
      addVisitToBasket: function(visit){
        dispatch({type: 'addVisit', visit})
      }
    }
}

  export default connect(null, mapDispatchToProps)(Book)