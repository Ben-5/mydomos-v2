import React, { useState, useEffect } from 'react';


export default function Input (props) {

    const [content, setContent] = useState(props.value || '');
    const [inputClass, setInputClass] = useState('');

    useEffect(()=> {
        props.error ? setInputClass('input-container input-error') : setInputClass('input-container');
    }, [props.error]);

    // function handleEnter(e) {
    //     if (e.key === 'Enter') {
    //         if (props.onEnter) {
    //             props.onEnter();
    //         }
    //     }
    // }

    // useEffect(()=>{
    //     window.removeEventListener('keypress', handleEnter);
    //     window.addEventListener('keypress', handleEnter);
    // }, [content])

    return (
        <input
        name={props.name}
        //*****REQUIRED***** to get the content
        onChange={e=>{props.onChange(e.target.value); setContent(e.target.value)}}
        //set value
        value={content}
        //set type (default text) - email - password - etc
        type={props.type || 'text'}
        //set placeholder
        placeholder={props.placeholder || 'PLACE HOLDER PROPS MISSING'}
        //style
        className={inputClass}
        // OnClick Prop dont use it outside a form
        onClick={()=>{
            if (props.onClick && props.isInForm){props.onClick()}
        }}
        >
        </input>
    );
}
