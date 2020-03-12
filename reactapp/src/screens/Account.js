import React, {useState} from 'react';
import {connect} from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Button from '../components/Button';
import FormInfoUser from '../components/FormInfoUser';
import SliderNow from '../components/SliderNow';

import {Col, Row} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import {Redirect} from 'react-router-dom'

function Account(props) {

    const [currentUser, setCurrentUser] = useState(props.getCurrentUser || {});
    const [avatar, setAvatar] = useState(props.getCurrentUser.userAvatar || "")
    const [wig, setWig] = useState(false)
    const [armor, setArmor] = useState(false)
    const [medusa, setMedusa] = useState(false)


    
    //Sélectionner avatar

    var avatarMedusa = "https://i.pinimg.com/originals/cb/0c/ca/cb0cca26f462d845354ed8d8392a9c26.png"
    var avatarArmor = "https://i.pinimg.com/originals/59/12/f3/5912f3ea00d3c097cfaf76ac5c3e92b5.png"
    var avatarWig = "https://i.pinimg.com/originals/9b/8a/95/9b8a9506be47bc780710976192180b55.png"
    
    //La méduse
    var chooseMedusa = async (avatar) => {
        setAvatar("avatarMedusa")
        setWig(false)
        setArmor(false)
        setMedusa(true)
        
        const response = await fetch('/users/changeavatar', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `_id=${props.getCurrentUser._id}&userAvatar=${avatar}`
          }) 
        
        let resp = await response.json()
    }

    //Le casque
    var chooseArmor = async (avatar) => {
        setAvatar("avatarArmor")
        setWig(false)
        setArmor(true)
        setMedusa(false)

        const response = await fetch('/users/changeavatar', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `_id=${props.getCurrentUser._id}&userAvatar=${avatar}`
          }) 
        
        let resp = await response.json()
    }

    //La perruque
    var chooseWig = async (avatar) => {
        setAvatar("avatarWig")
        setWig(true)
        setArmor(false)
        setMedusa(false)

        const response = await fetch('/users/changeavatar', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `_id=${props.getCurrentUser._id}&userAvatar=${avatar}`
          }) 
        
        let resp = await response.json()
    }

    if(avatar === "avatarWig") {
        var borderW = {border: 'solid 2px #791212'}
        var borderA = {border: 'none'} 
        var borderM = {border: 'none'} 
    } else if (avatar === "avatarArmor") {
        borderA = {border: 'solid 2px #791212'}
        borderW = {border: 'none'} 
        borderM = {border: 'none'} 
    } else if (avatar === "avatarMedusa") {
        borderM = {border: 'solid 2px #791212'}
        borderW = {border: 'none'} 
        borderA = {border: 'none'} 
    }

    //Afficher les réservations de l'utilisateur

    const dataOrder = [
        // {
        //     title: 'Réservation 357',
        //     description: 'lundi 1 janvier 2020'
        // },{
        //     title: 'Réservation 841',
        //     description: 'lundi 1 janvier 2020'
        // },
    ];

    var noOrder
    if(dataOrder === 0){
        noOrder = "Vous n'avez effectué aucune réservation pour le moment."
    }

    

    if (!props.getCurrentUser) {
        return <Redirect to="/signin"/>
    } else {

        return (

            <div  className="background">
        
                <Header/>

                <div className="body-screen">

                       <div className="my-account-title" style={{marginLeft: '2vmin', marginTop: '4vmin'}}>
                           <Title title="Mon compte"/>
                           <LogoutOutlined className="log-out" style={{ fontSize: '4vmin', marginLeft: '3vmin', color: 'white' }} onClick={()=>props.signout()}/>
                        </div>


                 {/* COORDONNEES */}

                    <div>

                        <Row className="my-account-main">

                            <Col className="my-account" xs ={{span:24, order:2}} sm ={{span:24, order:2}} md ={{span:24, order:2}} lg ={{span:12, order:1}} xl ={{span:12, order:1}}>

                                <FormInfoUser/>

                            </Col>

                            {/* AVATAR */}

                            <Col className="my-avatar" xs ={{span:24, order:1}} sm ={{span:24, order:1}} md ={{span:2, order:1}} lg ={{span:12, order:2}} xl ={{span:12, order:2}}>

                                <Subtitle subtitle="Mon portrait"/>
                                
                                
                                <div className="avatar">

                                    <span className="background-wig" style={borderW}><img src={avatarWig} className="picto-portrait" alt="picto-portrait" onClick={() => {chooseWig("avatarWig"); props.changeAvatar("avatarWig")} }/></span>  
                                    <span className="background-armor" style={borderA}><img src={avatarArmor} className="picto-portrait" alt="picto-portrait" onClick={() => {chooseArmor("avatarArmor"); props.changeAvatar("avatarArmor")} }/></span>  
                                    <span className="background-medusa" style={borderM}><img src={avatarMedusa} className="picto-medusa" alt="picto-portrait" onClick={() => {chooseMedusa("avatarMedusa"); props.changeAvatar("avatarMedusa")}}/></span>  
                                
                                </div>

                            </Col>

                        </Row>

                    </div>
                    
                    {/* CHANGER MDP */}

                    {/* <div className="my-password">

                        <Subtitle subtitle="Modifier mon mot de passe"/>

                    <div className="grid-container">

                        <div className="grid-item account-info"><Text text="Mot de passe actuel"/></div>
                        <div className="grid-item "><Input placeholder="Mot de passe actuel" type="password"/></div>

                        <div className="grid-item account-info"><Text text="Nouveau mot de passe"/></div>
                        <div className="grid-item"><Input placeholder="Nouveau mot de passe" type="password"/></div>

                        <div className="grid-item account-info"><Text text="Confirmez le nouveau mot de passe"/></div>
                        <div className="grid-item"><Input placeholder="Confirmez le nouveau mot de passe" type="password"/></div>
                    </div>

                    <Button buttonTitle="Valider mon nouveau mot de passe"/>

                    </div> */}

                {/* RESERVATIONS DU COMPTE */}

                    <div className="account-subtitle">
                        <Subtitle subtitle="Mes réservations"/>
                        <p style={{padding:0, fontSize:'1.4em'}}>{noOrder}</p>
                    </div>
                    {/* <List className="reservations"
                        itemLayout="horizontal"
                        dataSource={dataOrder}
                        renderItem={item => (
                        <List.Item
                            actions={[<Button buttonTitle="Voir"/>]}>
                            <List.Item.Meta
                            title={<Text text={item.title}></Text>}
                            description={item.description}
                            />
                        </List.Item>
                        )}
                    /> */}

                </div>
                {/* SLIDER */}
                
                <div style={{paddingTop:25}} className="breaking-visits">
            
                <h3 className="sliderTitle">Visites à la une</h3>
                    <SliderNow />
                        <div style={{paddingLeft: '2vmin', marginTop: '7vmin'}}>
                            <Button link='/results' buttonTitle="Voir plus"/>
                        </div>

                    </div>
                
                <Footer/>
                <Navigation/>

        </div>
        )
    }
}


function mapStateToProps(state) {
    return { getCurrentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAvatar: function(avatar) { 
          dispatch( {type: 'changeAvatar', avatar : avatar} ) 
        },
        signout: function() { 
            dispatch( {type: 'signout'} )
        },
    }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps,
)(Account);