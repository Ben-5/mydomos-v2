import React,{useState} from 'react';
import { Select, Tooltip} from 'antd';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom'

const { Option } = Select;

function Header(props) {

    const [currentUser, setCurrentUser] = useState(props.getCurrentUser || {});

    //Changement d'avatar dans la nav
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
