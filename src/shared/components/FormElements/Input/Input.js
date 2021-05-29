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
        autoComplete,
        handleChange,
        handleBlur,
        isValid,
        isTouched,
        errorMessage 
    } = props;

    const onInputChange = (event) => {
        const { value } = event.target;
        handleChange(name, value);
    };

    const onInputBlur = (event) => {
        handleBlur(name);
    };

    const elementToRender = element === 'input' ? (
        <input 
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={onInputChange}
            onBlur={onInputBlur}
            value={value}
        />
    ) : (
        <textarea id={id} rows={props.rows || 3} name={name} autoComplete={autoComplete} onChange={onInputChange} onBlur={onInputBlur} value={value}/>
    );

    return (
        <div className={`form-control ${!isValid && isTouched && 'form-control--invalid'}`}>
            <label htmlFor={id}>{label}</label>
            {elementToRender}
            {!isValid && isTouched && errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Input;