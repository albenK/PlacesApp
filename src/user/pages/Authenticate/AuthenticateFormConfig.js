import { emailRule, requiredRule, minLengthRule, acceptedFilesRule } from '../../../shared/utils/validators';

export const SIGN_IN_FORM_CONFIG = {
    emailAddress: {
        id: 'emailAddress',
        label: 'Email Address',
        name: 'emailAddress',
        elementConfigs: {
            element: 'input',
            type: 'email',
            placeholder: '',
            autoComplete: 'email'
        },
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
        id: 'password',
        label: 'Password',
        name: 'password',
        elementConfigs: {
            element: 'input',
            type: 'password',
            placeholder: '',
            autoComplete: 'current-password'
        },
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            minLengthRule('Password', 6)
        ]
    }
};

export const NAME_CONTROL_CONFIG = {
    id: 'name',
    label: 'Your Name',
    name: 'name',
    elementConfigs: {
        element: 'input',
        type: 'text',
        placeholder: '',
        autoComplete: 'name'
    },
    value: '',
    isValid: false,
    isTouched: false,
    errorMessage: '',
    validationRules: [
        requiredRule('Your Name')
    ]
};

export const IMAGE_CONTROL_CONFIG = {
    id: 'profileImage',
    label: '',
    name: 'profileImage',
    elementConfigs: {
        accept: '.jpg,.jpeg,.png'
    },
    value: null,
    isValid: false,
    isTouched: false,
    errorMessage: '',
    validationRules: [
        acceptedFilesRule('Profile Picture', ['image/png', 'image/jpg', 'image/jpeg'])
    ]
};