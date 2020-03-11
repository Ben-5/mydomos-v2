import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Navigation from '../components/Navigation';


function App() {
    return (
      <div className="background">
        <Header/>
        {/* <Col className="middle-caption-image" xs ={{span:24, order:1}} sm ={{span:24, order:1}} md ={{span:24, order:1}} lg ={{span:12, order:1}}>
                        <span className="middle-caption-background"><img src="../headset.png" className="headset" alt="headset"/></span>  
                    </Col> */}
      <Footer/>
      <Navigation/>
    </div>
    )
  }

export default App;