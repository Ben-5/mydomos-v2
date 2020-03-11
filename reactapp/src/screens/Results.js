import React, {useState, useEffect} from 'react';

import {Col} from 'antd';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Title from '../components/Title';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Navigation from '../components/Navigation';
import Subtitle from '../components/Subtitle';

import {Row} from 'antd'

function Results(props) {

  const [content, setContent] = useState('')
  const [resultList, setResultList] = useState([])
  
  //Récupérer les visites de la BDD
    useEffect(() => {
        window.scrollTo(0, 0)
        const getlist = async() => {
        const response = await fetch('/visit/results')
        const data = await response.json()
        setResultList(data.list) 
        }
        getlist()  
    },[])


    return (

        <div className="background">
    
            <Header/>

            <div className="body-screen">


            <div className="main-caption" style={{marginBottom:"6vmin"}}>
                
                <Row>

                <Col className= "main-caption-text" xs ={{span:24, order:2}} sm ={{span:24, order:2}} md ={{span:24, order:2}} lg ={{span:12, order:1}} xl ={{span:12, order:1}}>
                    <Title title="Trouvez des visites"/>
                    <Subtitle subtitle="Réservez des visites exclusives de maisons historiques privées animées par des propriétaires passionés"/>
                    <div style={{marginTop: "6vmin"}}>
                        <Input 
                            placeholder="essayer 'Paris'"
                            type="text"
                            onChange={e=>setContent(e)}
                            value={content}
                            />
                    </div>
                </Col>

                <Col className="bubble-animation" xs ={{span:24, order:1}} sm ={{span:24, order:1}} md ={{span:24, order:1}} lg ={{span:12, order:2}} xl ={{span:12, order:2}}>
                    <img src="../statue.png" className="statue" alt="statue" />
                    <img src="../bubble.png" className="bubble" alt="bubble" />     
                </Col>

                </Row>

            </div>

                {/* <div style={{display:'flex', marginLeft: '2vmin', marginRight: '2vmin', alignItems:'center', marginTop:'6vmin', marginBottom:'10vmin'}}>

                    
                    <div style={{ marginLeft: '10vmin'}}>
                        <Button 
                        buttonTitle="Valider"
                        />
                    </div>

                </div> */}
            
                
                    <Row className="card_row">

                    {resultList.map((visit, i) => (
                        <Card
                            key={i}
                            id={visit._id}
                            info={visit.address.city}
                            image={visit.cover}
                            title={visit.title}
                            price={visit.info[0].price}/>
                     ))}
                    
                    </Row>

            </div> 
            <Footer/>
            <Navigation/>
      </div>
    )
  }


export default Results;