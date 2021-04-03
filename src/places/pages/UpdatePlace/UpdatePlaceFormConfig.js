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
                    {...formControl}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            );
        },
        id: 'title',
        name: 'title',
        label: 'Title',
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
        name: 'description',
        label: 'Description',
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            minLengthRule('Description', 5)
        ]
    }
};
