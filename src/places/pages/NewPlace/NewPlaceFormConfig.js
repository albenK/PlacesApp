import { minLengthRule, requiredRule, acceptedFilesRule } from "../../../shared/utils/validators";

// object representation of NewPlace form
export const New_Place_Form_Config = {
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
    },
    address: {
        id: 'address',
        label: 'Address',
        name: 'address',
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
            requiredRule('Address')
        ]
    },
    placeImage: {
        id: 'placeImage',
        label: '',
        name: 'placeImage',
        elementConfigs: {
            accept: '.jpg,.jpeg,.png'
        },
        value: null,
        isValid: false,
        isTouched: false,
        errorMessage: '',
        validationRules: [
            acceptedFilesRule('Place Image', ['image/png', 'image/jpg', 'image/jpeg'])
        ]
    }
};
