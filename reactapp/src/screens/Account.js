import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import FormInfoUser from '../components/FormInfoUser';

import {Col, List} from 'antd';
import {Link} from 'react-router-dom'

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

    const data = [
        {
            title: 'Réservation 357',
            description: 'lundi 1 janvier 2020'
        },{
            title: 'Réservation 841',
            description: 'lundi 1 janvier 2020'
        },
    ];


    return (

        <div  className="background">
    
            <Header/>

            <div className="body-screen">

            <div style={{marginLeft: '2vmin', marginTop: '4vmin'}}>

                <Title title="Mon compte"/>
                <Button onClick={()=>props.signout()} buttonTitle="Me Deconnecter"/> 

            </div>

            {/* COORDONNEES */}

            <div className="my-account-main">

            <div className="my-account">

                <Subtitle subtitle="Mes informations"/>

                <FormInfoUser/>

            </div>

                {/* AVATAR */}

                <div className="my-avatar">

                    <Subtitle subtitle="Mon portrait"/>

                    <div className="avatar">

                    <div className="middle-caption-image">
                        <span className="background-wig" style={borderW}><img src={avatarWig} className="picto-portrait" alt="picto-portrait" onClick={() => {chooseWig("avatarWig"); props.changeAvatar("avatarWig")} }/></span>  
                    </div>

                    <div className="middle-caption-image">
                        <span className="background-armor" style={borderA}><img src={avatarArmor} className="picto-portrait" alt="picto-portrait" onClick={() => {chooseArmor("avatarArmor"); props.changeAvatar("avatarArmor")} }/></span>  
                    </div>

                    <div className="middle-caption-image">
                        <span className="background-medusa" style={borderM}><img src={avatarMedusa} className="picto-medusa" alt="picto-portrait" onClick={() => {chooseMedusa("avatarMedusa"); props.changeAvatar("avatarMedusa")}}/></span>  
                    </div>

                    </div>

                </div>

                </div>
                
                {/* CHANGER MDP */}


                <div className="my-password">

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

                </div>

            

            {/* RESERVATIONS DU COMPTE */}
                <div className="account-subtitle">
                    <Subtitle subtitle="Mes réservations"/>
                </div>

                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item
                        actions={[<Button buttonTitle="Voir"/>]}>
                        <List.Item.Meta
                        title={<Text text={item.title}></Text>}
                        description={item.description}
                        />
                    </List.Item>
                    )}
                />



            

            {/* SLIDER */}
            <div className="breaking-visits">
            
            <h3 className="sliderTitle">Visites à la une</h3>

            <div className="scrolling-wrapper">

                <Col className="card_col" sm={8} md={6} lg={6}>
                    <h3 className="card_info">Paris</h3>
                <Link className="card_link">
                    <img className="card_img" alt="visit cover" src="/cover/chanel.jpg"/>
                    <h4 className="card_title">Appartement Chanel</h4>
                </Link>
                    <div className="card_pricerate">
                        <div>
                            <p className="card_price">À partir de 39 €</p>
                        </div>
                        <div className="card_div_rate">
                            <img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/noteG.png'/><img className="slider_rate" alt="note" src='/noteG.png'/>
                        </div>
                    </div>
                </Col>
                <Col className="card_col" sm={8} md={6} lg={6}>
                    <h3 className="card_info">Bruxelles</h3>
                <Link className="card_link">
                    <img className="card_img" alt="visit cover" src="/cover/tassinier.jpg"/>
                    <h4 className="card_title">Hôtel Tassinier</h4>
                </Link>
                    <div className="card_pricerate">
                        <div>
                            <p className="card_price">À partir de 49 €</p>
                        </div>
                        <div className="card_div_rate">
                            <img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/noteG.png'/><img className="slider_rate" alt="note" src='/noteG.png'/>
                        </div>
                    </div>
                </Col>
                <Col className="card_col" sm={8} md={6} lg={6}>
                    <h3 className="card_info">Paris</h3>
                <Link className="card_link">
                    <img className="card_img" alt="visit cover" src="/cover/tournelles.jpg"/>
                    <h4 className="card_title">Hôtel des Tournelles</h4>
                </Link>
                    <div className="card_pricerate">
                        <div>
                            <p className="card_price">À partir de 35 €</p>
                        </div>
                        <div className="card_div_rate">
                            <img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/noteG.png'/><img className="slider_rate" alt="note" src='/noteG.png'/>
                        </div>
                    </div>
                </Col>
                <Col className="card_col" sm={8} md={6} lg={6}>
                    <h3 className="card_info">Paris</h3>
                <Link className="card_link">
                    <img className="card_img" alt="visit cover" src="/cover/gainsbourg.jpg"/>
                    <h4 className="card_title">Maison de Gainsbourg</h4>
                </Link>
                    <div className="card_pricerate">
                        <div>
                            <p className="card_price">À partir de 39 €</p>
                        </div>
                        <div className="card_div_rate">
                            <img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/noteG.png'/><img className="slider_rate" alt="note" src='/noteG.png'/>
                        </div>
                    </div>
                </Col>
                <Col className="card_col" sm={8} md={6} lg={6}>
                    <h3 className="card_info">Paris</h3>
                <Link className="card_link">
                    <img className="card_img" alt="visit cover" src="/cover/ponti.jpg"/>
                    <h4 className="card_title">Villa Ponti</h4>
                </Link>
                    <div className="card_pricerate">
                        <div>
                            <p className="card_price">À partir de 45 €</p>
                        </div>
                        <div className="card_div_rate">
                            <img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/note.png'/><img className="slider_rate" alt="note" src='/noteG.png'/><img className="slider_rate" alt="note" src='/noteG.png'/>
                        </div>
                    </div>
                </Col>

            </div>

            </div>

            </div>
            
            
            <Footer/>

      </div>
    )
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