import { requiredRule, minLengthRule } from '../../../shared/utils/validators';

// object representation of update place form.
export const UPDATE_PLACE_FORM_CONFIG = {
    title: {
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
