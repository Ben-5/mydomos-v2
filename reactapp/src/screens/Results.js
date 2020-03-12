import React, {useState} from 'react';

import {Col} from 'antd';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Title from '../components/Title';
import Card from '../components/Card';
import Input from '../components/Input';
import Navigation from '../components/Navigation';
import Subtitle from '../components/Subtitle';

import {Row} from 'antd'

function Results() {

  const [content, setContent] = useState('')

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

                        <Card/>

            </div> 
            <Footer/>
            <Navigation/>
      </div>
    )
  }


export default Results;