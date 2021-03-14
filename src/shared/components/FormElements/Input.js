import React  from 'react';

import './Input.css';

const Input = (props) => {
    const {
        element,
        id,
        type, 
        name, 
        value,
        label,
        placeholder, 
        handleChange,
        handleBlur,
        isValid,
        isTouched,
        errorMessage 
    } = props;

    const elementToRender = element === 'input' ? (
        <input 
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
        />
    ) : (
        <textarea id={id} rows={props.rows || 3} name={name} onChange={handleChange} onBlur={handleBlur} value={value}/>
    );

    return (
        <div className={`form-control ${!isValid && 'form-control--invalid'}`}>
            <label htmlFor={id}>{label}</label>
            {elementToRender}
            {!isValid && errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Input;