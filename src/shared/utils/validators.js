const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDAOTR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';



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
        (formControlValue, form) => formControlValue.trim().length !== 0 
    );
}

export const minLengthRule = (formControlName, minCharacters) => {
    return createValidationRule(
        VALIDATOR_TYPE_MINLENGTH,
        `${formControlName} should contain atleast ${minCharacters} characters`,
        (formControlValue, form) => formControlValue.length >= minCharacters
    );
}

