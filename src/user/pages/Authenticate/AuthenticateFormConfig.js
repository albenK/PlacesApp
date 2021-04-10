import React from 'react';

import { emailRule, requiredRule, minLengthRule } from '../../../shared/utils/validators';

import Input from '../../../shared/components/FormElements/Input/Input';

export const SIGN_UP_FORM_CONFIG = {
    emailAddress: {
        renderControl: (formControl, handleChange, handleBlur, key) => {
            return (
                <Input
                    key={key}
                    element="input"
                    type="email"
                    {...formControl}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            );
        },
        id: 'signUpEmail',
        label: 'Email Address',
        name: 'emailAddress',
        placeholder: '',
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            requiredRule('Email Address'),
            emailRule('Email Address')
        ]
    },
    password: {
        renderControl: (formControl, handleChange, handleBlur, key) => {
            return (
                <Input
                    key={key}
                    element="input"
                    type="password"
                    {...formControl}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            );
        },
        id: 'signUpPassword',
        label: 'Password',
        name: 'password',
        placeholder: '',
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            minLengthRule('Password', 8),
        ]
    }
};

export const SIGN_IN_FORM_CONFIG = {
    emailAddress: {
        renderControl: (formControl, handleChange, handleBlur, key) => {
            return (
                <Input
                    key={key}
                    element="input"
                    type="email"
                    {...formControl}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            );
        },
        id: 'signUpEmail',
        label: 'Email Address',
        name: 'emailAddress',
        placeholder: '',
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            requiredRule('Email Address'),
            emailRule('Email Address')
        ]
    },
    password: {
        renderControl: (formControl, handleChange, handleBlur, key) => {
            return (
                <Input
                    key={key}
                    element="input"
                    type="password"
                    {...formControl}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            );
        },
        id: 'signUpPassword',
        label: 'Password',
        name: 'password',
        placeholder: '',
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            minLengthRule('Password', 5),
        ]
    }
};