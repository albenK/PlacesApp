import React from 'react';

import { emailRule, requiredRule, minLengthRule } from '../../../shared/utils/validators';

import Input from '../../../shared/components/FormElements/Input/Input';

export const SIGN_UP_FORM_CONFIG = {
    name: {
        renderControl: (formControl, handleChange, handleBlur, key) => {
            return (
                <Input
                    key={key}
                    element="input"
                    type="text"
                    {...formControl}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            );
        },
        id: 'name',
        label: 'Your Name',
        name: 'name',
        placeholder: '',
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            requiredRule('Your Name')
        ]
    },
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

export const SIGN_IN_FORM_CONFIG = {
    emailAddress: {
        renderControl: (formControl, handleChange, handleBlur, key) => {
            return (
                <Input
                    key={key}
                    element="input"
                    type="email"
                    autoComplete="email"
                    {...formControl}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            );
        },
        id: 'signInEmail',
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
                    autoComplete="current-password"
                    {...formControl}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            );
        },
        id: 'password',
        label: 'Password',
        name: 'password',
        placeholder: '',
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            minLengthRule('Password', 5)
        ]
    }
};

export const NAME_CONTROL_CONFIG = {
    renderControl: (formControl, handleChange, handleBlur, key) => {
        return (
            <Input
                key={key}
                element="input"
                type="text"
                autoComplete="name"
                {...formControl}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
        );
    },
    id: 'name',
    label: 'Your Name',
    name: 'name',
    placeholder: '',
    value: '',
    isValid: false,
    isTouched: false,
    errorMessage: '',
    validationRules: [
        requiredRule('Your Name')
    ]
};