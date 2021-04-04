import React from 'react';

import Input from "../../../shared/components/FormElements/Input/Input";

import { minLengthRule, requiredRule } from "../../../shared/utils/validators";

// object representation of NewPlace form
export const New_Place_Form_Config = {
    title: {
        renderControl: (formControl, handleChange, handleBlur, key) => {
            /* arg formControl represents this control object itself,
                i.e {id: 'title', name: 'title', label: 'Title',...}
                arg handleChange represents the onChange event handler.
                arg handleBlur represents the onBlur event handler.
                arg key represents the key to use when iterating over this forms controls.

                This function will be called by our custom useForm Hook.

                This function will return the JSX code we want to render.
            */
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
        name: 'title',
        label: 'Title',
        placeholder: '',
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
    },
    address: {
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
        id: 'address',
        name: 'address',
        label: 'Address',
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            requiredRule('Address')
        ]
    }
};
