import React, { useReducer }from 'react';

import './Input.css';

// Action Types
const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: true
            };
        default:
            return state;
    }
};


// Input Component
const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});

    const changeHandler = (event) => {
        console.log('change handler is running');
        dispatch({type: INPUT_CHANGE, value: event.target.value});
    };

    const element = props.element === 'input' ? (
        <input 
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputState.value}
        />
    ) : (
        <textarea id={props.id} rows={props.rows || 3} onChange={changeHandler} value={inputState.value}/>
    );

    return (
        <div className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;