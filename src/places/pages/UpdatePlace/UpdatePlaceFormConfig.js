import React from 'react';
import Input from '../../../shared/components/FormElements/Input/Input'
import { requiredRule, minLengthRule } from '../../../shared/utils/validators';

// object representation of update place form.
export const UPDATE_PLACE_FORM_CONFIG = {
    title: {
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
        id: 'title',
        label: 'Title',
        name: 'title',
        elementConfigs: {
            element: 'input',
            type: 'text',
            placeholder: '',
            autoComplete: 'on'
        },
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            requiredRule('Title')
        ]
    },
    description: {
        renderControl: (formControl, handleChange, handleBlur, key) => {
            return (
                <Input
                    key={key}
                    element="textarea"
                    {...formControl}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            );
        },
        id: 'description',
        label: 'Description',
        name: 'description',
        elementConfigs: {
            element: 'textArea',
            autoComplete: 'on'
        },
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            minLengthRule('Description', 5)
        ]
    }
};
