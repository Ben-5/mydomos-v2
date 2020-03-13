import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

function Navigation(props) {

  const [currentUser] = useState(props.getCurrentUser || {});

  //Changement d'avatar dans la nav mobile
  var pictoAvatar
  if (props.getCurrentUser) {
          if (props.getCurrentUser.userAvatar === "avatarMedusa") {
              pictoAvatar = "https://i.pinimg.com/originals/fb/31/50/fb3150026430539cfc9f53bc0c4f64cc.png"
          } else if (props.getCurrentUser.userAvatar === "avatarArmor") {
              pictoAvatar = "https://i.pinimg.com/originals/df/f6/55/dff6552bc8924812220820b043f91702.png"
          } else if (props.getCurrentUser.userAvatar === "avatarWig") {
              pictoAvatar = "https://i.pinimg.com/originals/61/81/da/6181da56637a1c30182c375658ad0e65.png"
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