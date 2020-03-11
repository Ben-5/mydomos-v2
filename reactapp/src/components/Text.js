import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';


export default function Text(props){
    var toDis;

    if (props.isLink) {
        if (props.onClick) {
            toDis= <Link onClick={()=>props.onClick()} to={'/basket'} className={'Text-link paragraphe-container'} >{props.text}</Link>
        } else {
            toDis= <Link to={props.link} className={'Text-link paragraphe-container'} >{props.text}</Link>
        }
        
    } else {
        toDis= <p className={'Text paragraphe-container'}>{props.text}</p>
    }

    return(
        <div>
            {toDis}
        </div>
    );
}
