import React, { useState, useEffect } from 'react';
import Input from '../components/Input'
import Button from '../components/Button'
import Text from '../components/Text'

export default function Form (props) {

    const [inputDis] = useState(props.inputList);
    const [btnDis] = useState(props.btn);
    const [linkDis] = useState(props.linkList);
    const [result, setResult] = useState([]);
    const [errorDis, setErrorDis] = useState([]);
    const [isOnForm, setIsOnForm] = useState(false);
    
    useEffect(()=> {
        var test = props.inputList
        var cpy = [];
        for (var i=0;i<test.length;i++){
            var toInsert = {name: test[i].name, value: test[i].value};
            if (test[i].match) {
                toInsert.match = test[i].match;
            }
            cpy.push(toInsert)
        }
        setResult(cpy);
    }, [props.inputList]);

    useEffect(()=>{
        if (isOnForm) {
            window.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    postTheForm();
                }
            });
        }
    }, [isOnForm]);


    var changeToState = (content, position) => {
        var cpy = [...result];
        cpy[position].value = content;
        setResult(cpy);
    }

    var finalPost = async() => {
        var request = '';
        for(var i=0;i<result.length;i++) {
            if (i === 0) {request = request + `${result[i].name}=${result[i].value}`}
            else {request = request + `&${result[i].name}=${result[i].value}`}
        }

        var rawRes = await fetch(props.route, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: request
        });

        var prsRes = await rawRes.json();
        props.getRes(prsRes)
    }

    var postTheForm = async() => {
        var toPost = [...result];
        var cpy = [];

        for (var i=0;i<toPost.length;i++) {
            if (toPost[i].value === undefined || toPost[i].value === '') {
                cpy.push(toPost[i].name);
            }
        }

        setErrorDis(cpy);

        var notMatch = [];
        if (!cpy[0]) {
            for (var j=0;j<toPost.length;j++) {
                if (toPost[j].match){
                    if (toPost[toPost[j].match].value !== toPost[j].value) {
                        notMatch.push(toPost[j].name);
                        notMatch.push(toPost[toPost[j].match].name);
                    }
                }
            }
            if (notMatch[0]) {
                setErrorDis(notMatch);
            } else {
                finalPost();
            }
        }
    }

    var listInput = inputDis.map((input, i) =>{
        var isError = false;

        for(var index=0;index<errorDis.length;index++) {
            if (errorDis[index] === input.name) {
                isError = true;
            }
        }

        return (
            <Input
            key={i}
            error={isError}
            name={input.name}
            placeholder={input.placeholder}
            onChange={e=>changeToState(e, i)}
            type={input.type}
            onClick={()=>setIsOnForm(true)}
            isInForm={true}
            />
        );
    });

    var listBtn = btnDis.map((btn, i) =>{
        return (
            <Button
            key={i}
            onClick={()=>postTheForm()}
            buttonTitle={btn.title}
            />
        );
    });

    var listLink = linkDis.map((link, i) =>{
        return (
            <Text key={i} text={link.title} isLink={true} link={link.link}/>
        );
    });

    return (
        <div className={props.containerClassName} style={props.containerStyle}>
            <div className='form-container'>
                <div className='form-top-container'>
                    {listInput}
                </div>

                <div className='form-submit-container'>
                    <div className='form-button-container'>
                        {listBtn}
                    </div>
                </div>

                <div className='form-bottom-container'>
                    {listLink}
                </div>
            </div>
        </div>
    );
}