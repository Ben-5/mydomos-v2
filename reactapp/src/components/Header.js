import React,{useState} from 'react';
import { Select, Tooltip} from 'antd';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom'

const { Option } = Select;

function Header(props) {

    const [currentUser] = useState(props.getCurrentUser || {});

    //Changement d'avatar dans la nav
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
    var account;
    var link;
    if (currentUser.userAvatar) {
        account = "mon compte";
        link='/account';
    } else {
        account = "connexion";
        link='/signin';
    }


  return (
        <header className="header-container">
                
                    <div className="header-logo">
                        <Link to='/home'>
                        <img src="../logo.png" className="logo" alt="logo" />
                        </Link>
                        <Link to='/home'>
                        <div className="header-title">MYDOMOS</div>
                        </Link>
                    </div>
                    <div className="header-lang-menu">
                        <div className="header-lang">
                            <Select defaultValue="fr" style={{ width: 77, marginRight:'3vmin' }} bordered={false}>
                                <Option value="fr">FR</Option>
                                <Option value="en">EN</Option>
                            </Select>
                        </div>
                        <div className="header-menu">
                            <Link to='/results'>
                            <Tooltip placement="bottomRight" title="recherche">
                            <span className="picto-background"><img src="../picto-search.png" className="picto" alt="picto" /></span>
                            </Tooltip>
                            </Link>
                            <Link to='/basket'>
                            <Tooltip placement="bottomRight" title="mon panier">
                            <span className="picto-background"><img src="../picto-bag.png" className="picto" alt="picto"/></span>
                            </Tooltip>
                            </Link>
                            <Link to={link}>
                            <Tooltip placement="bottomRight" title={account}>
                            <span className="picto-background"><img src={pictoAvatar} className="picto" alt="picto"/></span>
                            </Tooltip>
                            </Link>
                        </div>
                    </div>
        </header>
    );
}

function mapStateToProps(state) {
    return { getCurrentUser: state.currentUser }
}

export default connect (
    mapStateToProps,
    null,
)(Header);
