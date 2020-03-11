import React, {useState} from 'react';
import {connect} from 'react-redux';

import Input from './Input';
import Button from './Button';
import Text from './Text';

function FormInfoUser(props) {


    const [currentUser, setCurrentUser] = useState(props.getCurrentUser || {});
    const [change, setChange] = useState(false)


    //Modifier les champs de l'utilisateur
    const [lastname, setLastname] = useState(currentUser.userLastname)
    const [firstname, setFirstname] = useState(currentUser.userFirstname)
    const [email, setEmail] = useState(currentUser.userEmail)
    const [birthday, setBirthday] = useState(currentUser.userBirthday || "")
    const [address, setAddress] = useState(currentUser.userAddress || "")
    const [zip, setZip] = useState(currentUser.userZIP || "")
    const [city, setCity] = useState(currentUser.userCity || "")
    const [country, setCountry] = useState(currentUser.userCountry || "France")

    var info = {lastname, firstname, email, birthday, address, zip, city, country}
    console.log("info: ", info)

    var updateUser = async (info) => {
        const response = await fetch('/users/updateInfo', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `_id=${props.getCurrentUser._id}&userLastname=${lastname}&userFirstname=${firstname}&userEmail=${email}&userBirthday=${birthday}&userAddress=${address}&userZIP=${zip}&userCity=${city}&userCountry=${country}`})
        
        let resp = await response.json()
    }

        if (change === true) {
            return (
                <div>

                <div className="grid-container">

                    <div className="grid-item account-info"><Text text="Nom"/></div>
                    <div className="grid-item "><Input placeholder="nom" type="text" onChange={e=>setLastname(e)} value={lastname}/></div>

                    <div className="grid-item account-info"><Text text="Prénom"/></div>
                    <div className="grid-item "><Input placeholder="prénom" type="text" onChange={e=>setFirstname(e)} value={firstname}/></div>

                    <div className="grid-item account-info"><Text text="Email"/></div>
                    <div className="grid-item "><Input placeholder="email" type="text" onChange={e=>setEmail(e)} value={email}/></div>
                
                    <div className="grid-item account-info"><Text text="Date de naissance"/></div>
                    <div className="grid-item "><Input placeholder="date de naissance" type="text" onChange={e=>setBirthday(e)} value={birthday}/></div>

                    <div className="grid-item account-info"><Text text="Adresse"/></div>
                    <div className="grid-item "><Input placeholder="adresse" type="text" onChange={e=>setAddress(e)} value={address}/></div>

                    <div className="grid-item account-info"><Text text="Code postal"/></div>
                    <div className="grid-item "><Input placeholder="code postal" type="text" onChange={e=>setZip(e)} value={zip}/></div>

                    <div className="grid-item account-info"><Text text="Ville"/></div>
                    <div className="grid-item "><Input placeholder="ville" type="text" onChange={e=>setCity(e)} value={city}/></div>

                    <div className="grid-item account-info"><Text text="Pays"/></div>
                    <div className="grid-item "><Input placeholder="pays" type="text" onChange={e=>setCountry(e)} value={country}/></div>
                    
                </div> 
                    <Button buttonTitle="Enregistrer" onClick={ () => {updateUser(info); props.changeInfo(info); setChange(false)}}/> 

                </div>
            
            )

        } else { 

            return (
            
                <div>

                <div className="grid-container">

                    <div className="grid-item account-info"><Text text="Nom"/></div>
                    <div className="grid-item "><Text text={lastname}/></div>

                    <div className="grid-item account-info"><Text text="Prénom"/></div>
                    <div className="grid-item"><Text text={firstname}/></div>

                    <div className="grid-item account-info"><Text text="Email"/></div>
                    <div className="grid-item"><Text text={email}/></div>
                
                    <div className="grid-item account-info"><Text text="Date de naissance"/></div>
                    <div className="grid-item"><Text text={birthday}/></div>

                    <div className="grid-item account-info"><Text text="Adresse"/></div>
                    <div className="grid-item"><Text text={address}/></div>

                    <div className="grid-item account-info"><Text text="Code postal"/></div>
                    <div className="grid-item"><Text text={zip}/></div>

                    <div className="grid-item account-info"><Text text="Ville"/></div>
                    <div className="grid-item"><Text text={city}/></div>

                    <div className="grid-item account-info"><Text text="Pays"/></div>
                    <div className="grid-item"><Text text={country}/></div>
                    
                </div> 
                    <Button buttonTitle="Modifier mes informations" onClick={ () => setChange(true)}/> 

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