import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

function Navigation(props) {

  const [currentUser, setCurrentUser] = useState(props.getCurrentUser || {});

  //Changement d'avatar dans la nav mobile
  var pictoAvatar
  if (props.getCurrentUser) {
          if (props.getCurrentUser.userAvatar === "avatarMedusa") {
              pictoAvatar = "https://i.pinimg.com/originals/71/9c/e0/719ce0c638ca25a20bdf096ffc0e6501.png"
          } else if (props.getCurrentUser.userAvatar === "avatarArmor") {
              pictoAvatar = "https://i.pinimg.com/originals/6d/7e/d1/6d7ed13dc8172578feaa84dbd25c915b.png"
          } else if (props.getCurrentUser.userAvatar === "avatarWig") {
              pictoAvatar = "https://i.pinimg.com/originals/3c/62/96/3c62962b72f5a24b854cfce7049424de.png"
          }    
  } else {
      pictoAvatar = "../picto-key.png"
  } 

  //Changement de tooltip connexion/mon compte
    var account 
    if (currentUser.userAvatar) {
        account = "mon compte"
    } else {
        account = "connexion"
    }

  return (
        <div className="navigation-menu">
                <Link to='/results'>
                  <span className="nav-button"><img src="../picto-search.png" className="nav-picto" alt="picto" /><h6 className="picto-title">explorer</h6></span>
                </Link>
                <Link to='/basket'>
                  <span className="nav-button"><img src="../picto-bag.png" className="nav-picto" alt="picto"/><h6 className="picto-title">mon panier</h6></span>
                </Link>
                <Link to='/signin'>
                  <span className="nav-button"><img src={pictoAvatar} className="nav-picto" alt="picto"/><h6 className="picto-title">{account}</h6></span>
                </Link>
        </div>
    );
}

function mapStateToProps(state) {
  return { getCurrentUser: state.currentUser }
}

export default connect (
  mapStateToProps,
  null,
)(Navigation);