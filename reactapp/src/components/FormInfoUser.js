import React, {useState} from 'react';
import {connect} from 'react-redux';

import Input from './Input';
import Button from './Button';
import Subtitle from '../components/Subtitle';
import Text from './Text';
import {EditOutlined} from '@ant-design/icons';

function FormInfoUser(props) {


    const [currentUser] = useState(props.getCurrentUser || {});
    const [change, setChange] = useState(false)


    //Modifier les champs de l'utilisateur
    const [userLastname, setLastname] = useState(currentUser.userLastname)
    const [userFirstname, setFirstname] = useState(currentUser.userFirstname)
    const [userEmail, setEmail] = useState(currentUser.userEmail)
    const [userBirthday, setBirthday] = useState(currentUser.userBirthday || "")
    const [userAddress, setAddress] = useState(currentUser.userAddress || "")
    const [userZIP, setZip] = useState(currentUser.userZIP || "")
    const [userCity, setCity] = useState(currentUser.userCity || "")
    const [userCountry, setCountry] = useState(currentUser.userCountry || "France")

    var info = {userLastname, userFirstname, userEmail, userBirthday, userAddress, userZIP, userCity, userCountry}

    var updateUser = async (info) => {
        const response = await fetch('/users/updateInfo', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `_id=${props.getCurrentUser._id}&userLastname=${userLastname}&userFirstname=${userFirstname}&userEmail=${userEmail}&userBirthday=${userBirthday}&userAddress=${userAddress}&userZIP=${userZIP}&userCity=${userCity}&userCountry=${userCountry}`})
        
        let resp = await response.json()
    }

        if (change === true) {
            return (
                <div>

                    <div className="grid-container">

                    <div className="grid-item account-info"><Text text="Nom"/></div>
                    <div className="grid-item "><Input placeholder="nom" type="text" onChange={e=>setLastname(e)} value={userLastname}/></div>

                    <div className="grid-item account-info"><Text text="Prénom"/></div>
                    <div className="grid-item "><Input placeholder="prénom" type="text" onChange={e=>setFirstname(e)} value={userFirstname}/></div>

                    <div className="grid-item account-info"><Text text="Email"/></div>
                    <div className="grid-item "><Input placeholder="email" type="text" onChange={e=>setEmail(e)} value={userEmail}/></div>
                
                    <div className="grid-item account-info"><Text text="Date de naissance"/></div>
                    <div className="grid-item "><Input placeholder="date de naissance" type="text" onChange={e=>setBirthday(e)} value={userBirthday}/></div>

                    <div className="grid-item account-info"><Text text="Adresse"/></div>
                    <div className="grid-item "><Input placeholder="adresse" type="text" onChange={e=>setAddress(e)} value={userAddress}/></div>

                    <div className="grid-item account-info"><Text text="Code postal"/></div>
                    <div className="grid-item "><Input placeholder="code postal" type="text" onChange={e=>setZip(e)} value={userZIP}/></div>

                    <div className="grid-item account-info"><Text text="Ville"/></div>
                    <div className="grid-item "><Input placeholder="ville" type="text" onChange={e=>setCity(e)} value={userCity}/></div>

                    <div className="grid-item account-info"><Text text="Pays"/></div>
                    <div className="grid-item "><Input placeholder="pays" type="text" onChange={e=>setCountry(e)} value={userCountry}/></div>
                    
                </div> 

                    <Button buttonTitle="Enregistrer" onClick={ () => {updateUser(info); props.changeInfo(info); setChange(false)}}/> 

                </div>
            
            )

        } else { 

            return (
            
                <div>

                    <div className= "my-account-title">
                        <Subtitle subtitle="Mes informations"/>
                        <EditOutlined style={{ fontSize: '3vmin', marginLeft: '3vmin' }} onClick={ () => setChange(true)}/> 
                    </div>

                    <div className="grid-container">

                    <div className="grid-item account-info"><Text text="Nom"/></div>
                    <div className="grid-item "><Text text={userLastname}/></div>

                    <div className="grid-item account-info"><Text text="Prénom"/></div>
                    <div className="grid-item"><Text text={userFirstname}/></div>

                    <div className="grid-item account-info"><Text text="Email"/></div>
                    <div className="grid-item"><Text text={userEmail}/></div>
                
                    <div className="grid-item account-info"><Text text="Date de naissance"/></div>
                    <div className="grid-item"><Text text={userBirthday}/></div>

                    <div className="grid-item account-info"><Text text="Adresse"/></div>
                    <div className="grid-item"><Text text={userAddress}/></div>

                    <div className="grid-item account-info"><Text text="Code postal"/></div>
                    <div className="grid-item"><Text text={userZIP}/></div>

                    <div className="grid-item account-info"><Text text="Ville"/></div>
                    <div className="grid-item"><Text text={userCity}/></div>

                    <div className="grid-item account-info"><Text text="Pays"/></div>
                    <div className="grid-item"><Text text={userCountry}/></div>
                    
                    </div> 
                   
                </div>
            )

        }
}

function mapStateToProps(state) {
    return { getCurrentUser: state.currentUser }
}

function mapDispatchToProps(dispatch) {
    return {
        changeInfo: function(info) { 
          dispatch( {type: 'changeInfo', info : info} ) 
      }
    }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps,
)(FormInfoUser);