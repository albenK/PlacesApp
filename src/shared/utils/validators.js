const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDAOTR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_ACCEPTED_FILES = 'ACCEPTED_FILES';



/**
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleType - type of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */
const createValidationRule = (ruleType, errorMessage, validateFunc) => {
    return {
        type: ruleType,
        errorMessage: errorMessage,
        validate: validateFunc
    };
};


export const requiredRule = (formControlName) => {
    return createValidationRule(
        VALIDATOR_TYPE_REQUIRE,
        `${formControlName} is required`,
        (formControlValue, form) => formControlValue.length !== 0 
    );
}

export const minLengthRule = (formControlName, minCharacters) => {
    return createValidationRule(
        VALIDATOR_TYPE_MINLENGTH,
        `${formControlName} should contain at least ${minCharacters} characters`,
        (formControlValue, form) => formControlValue.length >= minCharacters
    );
}

export const maxLengthRule = (formControlName, maxCharacters) => {
    return createValidationRule(
        VALIDAOTR_TYPE_MAXLENGTH,
        `${formControlName} cannot contain more than ${maxCharacters} characters`,
        (formControlValue, form) => formControlValue.length <= maxCharacters
    );
}

export const minRule = (formControlName, minNumber) => {
    return createValidationRule(
        VALIDATOR_TYPE_MIN,
        `${formControlName} has to be less than or equal to ${minNumber}`,
        (formControlValue, form) => {
            const controlValueAsNumber = +formControlValue;
            return controlValueAsNumber <= minNumber;

        }
    );
};

export const maxRule = (formControlName, maxNumber) => {
    return createValidationRule(
        VALIDATOR_TYPE_MAX,
        `${formControlName} has to be greater than or equal to ${maxNumber}`,
        (formControlValue, form) => {
            const controlValueAsNumber = +formControlValue;
            return controlValueAsNumber >= maxNumber;

        }
    );
};

export const emailRule = (formControlName) => {
    return createValidationRule(
        VALIDATOR_TYPE_EMAIL,
        `${formControlName} must be in a valid email format`,
        (formControlValue, form) => /^\S+@\S+\.\S+$/.test(formControlValue)
    );
};

export const acceptedFilesRule = (formControlName, acceptedMIMETypes) => {
    return createValidationRule(
        VALIDATOR_TYPE_ACCEPTED_FILES,
        `${formControlName} must be one of ${(acceptedMIMETypes || []).join(', ')} file types.`,
        (formControlValue, form) => {
            const mimeTypes = acceptedMIMETypes || [];
            const fileList = formControlValue || [];
            let isValid = !!fileList && !!fileList.length;

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const isValidFile = mimeTypes.some(mimeType => file.type === mimeType);
                if (!isValidFile) {
                    isValid = false;
                    break;
                }
            }
            return isValid; 
        }
    );
};

