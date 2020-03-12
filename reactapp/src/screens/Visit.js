import React, {useState, useEffect} from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import Text from '../components/Text';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';

import {Row, Col, Avatar, Typography} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import '../App.css';

const { Paragraph } = Typography;

export default function Visit(props){

    const [visit, setVisit] = useState([])
    // const [description, setDescription] = useState("")
    // const [lieu, setLieu] = useState("")


    //Récupérer la visite
    useEffect(() => {
        window.scrollTo(0, 0)
        const getVisit = async() => {
        const data = await fetch(`/visit/visitpage/${props.match.params._id}`)
        const body = await data.json()
        setVisit(body.visit)
        // setLieu(body.visit[0].place)
        // setDescription(body.visit[0].desc)
        }
        getVisit()
    },[])

    // //Cacher la description si trop long
    // var desc = description
    // if (description.length > lieu.length) {
    //     console.log(lieu.length)
    //     desc = desc.slice(0, 500) + "..."
    // }


  //map de toutes les infos via BDD
    const visitSelected = visit.map((data, i) => {  

    const cityCountry = []
    if(data.address.country === 'fr'){
        cityCountry.push(<Text text={`${data.address.city}, France`}/> )
    }
    if(data.address.country === 'be'){
        cityCountry.push(<Text text={`${data.address.city}, Belgique`}/> )
    }

    const rateTAB = []
    if(data.rate < 0){
        data.rate = 0
    }
    if(data.rate > 5){
        data.rate = 5
    }
     for(var j=0;j<5;j++){
         var backgroundColor = {}
         if(j<data.rate){
             backgroundColor = {backgroundColor:'#791212'}
         }
         rateTAB.push(<span key={j} style={backgroundColor}  className="card_rate"></span>)
     }

    const dataOptList = data.info[0].opt;
    const tagList = [];
        let optList = dataOptList.map((opt, k) => {
          var styleInclu = {};
          if(opt === 'Apéro' ){
            tagList.push ( <div key={k} className="option"><span className="background-option"><img src="https://i.pinimg.com/originals/3d/97/c7/3d97c7b8000a512ddc9457990ad4732e.png" className="picto-option" alt="drink"/></span><Text text="Apéro"/></div>)
            }
            if(opt === 'Collation' ){
                tagList.push ( <div key={k} className="option"><span className="background-option"><img src="https://i.pinimg.com/originals/c8/7e/18/c87e18940869c649eb34dd28f2b31965.png" className="picto-option" alt="breakfast"/></span><Text text="Collation"/></div>)
            }
            if(opt === 'Café Thé' ){
                tagList.push ( <div key={k} className="option"><span className="background-option"><img src="https://i.pinimg.com/originals/5c/4f/42/5c4f420da05657b3404b862c8cf1edd9.png" className="picto-option" alt="coffe"/></span><Text text="Café Thé"/></div>)
            }
            if(opt === 'Concert' ){
                tagList.push ( <div key={k} className="option"><span className="background-option"><img src="https://i.pinimg.com/originals/3a/be/93/3abe93c50c81e43144536f796e68235f.png" className="picto-option" alt="concert"/></span><Text text="Concert"/></div>)
            }
            if(opt === 'By night' ){
                styleInclu = {display: "none"};
                tagList.push ( <div key={k} className="option"><span className="background-option"><img src="https://i.pinimg.com/originals/21/00/3e/21003e1267b560e9995dc1558a99c286.png" className="picto-option" alt="bynight"/></span><Text text="By Night"/></div> )
            }
            if(opt === 'Perle rare' ){
                styleInclu = {display: "none"};
                tagList.push ( <div key={k} className="option"><span className="background-option"><img src="https://i.pinimg.com/originals/f3/07/b7/f307b7f65051dbf839e187e1b3e26f0f.png" className="picto-option" alt="perle"/></span><Text text="Perle rare"/></div> )
            }
            if(opt === 'XXe' ){
                styleInclu = {display: "none"};
                tagList.push ( <div key={k} className="option"><span className="background-option"><img src="https://i.pinimg.com/originals/11/8b/d3/118bd33cd0f34191d8302ee9ce056868.png" className="picto-option" alt="XXe"/></span><p className="Text paragraphe-container" >XX<sup>e</sup></p></div> )
            }
            if(opt === 'XVIIIe' ){
                styleInclu = {display: "none"};
                tagList.push ( <div key={k} className="option"><span className="background-option"><img src="https://i.pinimg.com/originals/32/47/7c/32477c2f02b60b78e93ef830c38d17a0.png" className="picto-option" alt="XVIIIe"/></span><p className="Text paragraphe-container" >XVIII<sup>e</sup></p></div> )
            }
          return ( <Text style={styleInclu} key={k} text={opt} />)
        });

    return(

        <div key={i} >
        
        <Header/>

        <div className="body-screen">


{/* SECTION SLIDER */}

<div >

    <div className="scrolling-visit">
        <Col className="visit_col" >
            <img className="visit_img" alt="visit cover" src={data.pics[0]}/>
        </Col>
        <Col className="visit_col" >
            <img className="visit_img" alt="visit cover" src={data.pics[1]}/>
        </Col>
        <Col className="visit_col" >
            <img className="visit_img" alt="visit cover" src={data.pics[2]}/>
        </Col> 
        <Col className="visit_col" >
            <img className="visit_img" alt="visit cover" src={data.pics[3]}/>
        </Col>
        <Col className="visit_col" >
            <img className="visit_img" alt="visit cover" src={data.pics[4]}/>
        </Col>
  
    </div>

</div>

    {/* SECTION DESCRIPTION VISIT  */}

    <div className="visit-main">
        <div className="text-visit">
            <Title title={data.title}/>
            {cityCountry}
            <div className="card_pricerate">
                <div className="card_div_rate">
                    {rateTAB} 
                </div>
            </div>      
        </div>
        <div className="menu-visit">
            <Text text={`À partir de ${data.info[0].price} €`}/>
            <Button link={`/book/${visit[0]._id}`} buttonTitle="Voir les dates" />
        </div>
    </div>  
 
    <div className="options-row">{tagList}</div>

    <div className="features">
    <Row className="text-visit" >
        <Col xs ={{span:12}} sm ={{span:12}} md ={{span:6}} lg ={{span:6}} >
          <Subtitle subtitle="Durée" />
          <Text text={data.info[0].duration} />
        </Col>
        <Col xs ={{span:12}} sm ={{span:12}} md ={{span:6}} lg ={{span:6}}>
          <Subtitle subtitle="Taille du groupe" /> 
          <Text text={`Jusqu'à ${data.info[0].maxStock} personnes`} /> 
        </Col>
    </Row> 
    <Row className="text-visit">
       <Col xs ={{span:12}} sm ={{span:12}} md ={{span:6}} lg ={{span:6}}>
         <Subtitle subtitle="Inclu" /> 
         {optList}
       </Col>
       <Col xs ={{span:12}} sm ={{span:12}} md ={{span:6}} lg ={{span:6}}>
         <Subtitle subtitle="Langue" />
         <Text text={data.info[0].lang} />
       </Col>
    </Row>
    </div>
               

    

        {/* end partie remplacé fixed-menu-visit  */} 

    {/* SECTION TEXT VISIT  */}

                  {/* SECTION TEXT VISIT  */}

    <div className="visit-description">          
    <Row gutter={[32, 32]}>
        <Col lg={{span:12}}>
            <Subtitle subtitle="La visite" />
            <Text  text={data.desc}/>
        </Col >
        <Col lg={{span:12}}>
            <Subtitle subtitle="Le lieu" />
            <Text text={data.place}/>  
        </Col>
    </Row>

    <Row gutter={[32, 32]} className="votre-hote">
        <Col lg={{span:112}}>
            <Avatar className="avatar-hote" size={100} icon={<UserOutlined />} />
            <Subtitle subtitle="Votre hôte"/>
            <Text  text={data.host}/>
        </Col>     
    </Row> 
    </div>  
</div>
    
  <Footer/>
    
    {/* start partie mobile-fixed qui remplace className=menu-visit */}

    <Row align="middle" justify="space-around"  className="fixed-menu-visit">
        <Text text={`À partir de ${data.info[0].price} €`}/>
            <Button link={`/book/${visit[0]._id}`} buttonTitle="Voir les dates" />
    </Row>
    
    {/* end partie mobile-fixed qui remplace className=menu-visit */}
    
    </div>

    )
})
return (
    <div className="background">    

    {visitSelected}

    </div>
    )
    }