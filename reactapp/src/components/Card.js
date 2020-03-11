import React, {useState,useEffect} from 'react';
import '../index.css';
import {Col, Row} from 'antd';
import {Link} from 'react-router-dom';
import '../App.css';


export default function Card(props) {

    const [datacard, setDataCard] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
        const getcard = async() => {
        const response = await fetch('/visit/card')
        const data = await response.json()
        setDataCard(data.list)
        }
        getcard()  
    },[])


   const card = datacard.map((card, i) => {

    var priceInfo = null
    for(var l=0; l<card.info.length; l++){
        if(priceInfo === null || priceInfo > card.info[l].price){
            priceInfo = card.info[l].price
        }
    }

    const rateTAB = []
    if(card.rate < 0){
        card.rate = 0
    }
    if(card.rate > 5){
        card.rate = 5
    }
     for(var j=0;j<5;j++){
         var backgroundColor = {}
         if(j<card.rate){
             backgroundColor = {backgroundColor:'#791212'}
         }
         rateTAB.push(<span key={j} style={backgroundColor}  className="card_rate"></span>)
        }
    return (
        <Col key={i} className="card_col" sm={8} md={10} lg={6}>
            <p className="card_info">{card.address.city}</p>
            <Link className="card_link" to={`/visit/${card._id}`}>
                <img className="card_img" alt="card cover" src={card.cover}/>
                <p className="card_title">{card.title}</p>
            </Link>

            <div className="card_pricerate">
                <div>
                    <p className="card_price">À partir de {priceInfo} €</p>
                </div>
                <div className="card_div_rate">
                    {rateTAB} 
                </div>
            </div>
        </Col>)
     })

    return (
        <Row className="card_row">
            {card}
        </Row>
    )
}
