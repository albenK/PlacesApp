import { useCallback, useState } from "react";

const useForm = (formObject) => {
    const [form, setForm] = useState(formObject);

    const getValidityOfFormControl = useCallback((formControl) => {
        // This method will set the error message for the formControl and return a boolean
        // indicating whether or not this formControl is valid.
        let isValid = true;
        const validationRules = formControl.validationRules || [];
        for (let i = 0; i < validationRules.length; i++) {
            const validationRule = validationRules[i];
            const valid = validationRule.validate(formControl.value, form);
            // if this validation rule has failed, then set the error message and break out of loop
            if (!valid) {
                isValid = false;
                formControl.errorMessage = validationRule.errorMessage;
                break;
            }
        }
        return isValid;
    }, [form]);

    const onControlChange = useCallback((event) => {
        const { name, value } = event.target;
        console.log('change event happened ', 'value is ', value, '. name is ', name);
        if (!form[name]) { // safety check
            throw new Error(`The ${name} FormControl wasn't found in the form.`);
        }
        // copy the form control object who's input just changed.
        const formControl = { ...form[name] };
        // update value.
        formControl.value = value;
        // Set the error message and get whether this form control is valid or not.
        const isInputValid = getValidityOfFormControl(formControl);
        // If the formControl is valid and it was previously invalid.
        if (isInputValid && !formControl.isValid) {
            formControl.isValid = true;
        }
        else if (!isInputValid && formControl.isValid) {
            // If the formControl is invalid and it was previously valid.
            formControl.isValid = false;
        }
        // change isTouched to true, since this control has been touched. Usefull for showing validation error messages.
        formControl.isTouched = true;
        setForm({ ...form, [name]: formControl });

    }, [form, getValidityOfFormControl]);

    const onBlurChange = useCallback((event) => {
        const { name } = event.target;
        console.log('blur event happened. name is ', name);
        if (!form[name]) { // safety check
            throw new Error(`The ${name} FormControl wasn't found in the form.`);
        }
        // copy the form control object who just lost focus.
        const formControl = { ...form[name] };
        // change isTouched to true, since this control has been touched. Usefull for showing validation error messages.
        formControl.isTouched = true;

        // Set the error message and get whether this form control is valid or not.
        const isInputValid = getValidityOfFormControl(formControl);
        // If the formControl is valid and it was previously invalid.
        if (isInputValid && !formControl.isValid) {
            formControl.isValid = true;
        }
        else if (!isInputValid && formControl.isValid) {
            // If the formControl is invalid and it was previously valid.
            formControl.isValid = false;
        }
        console.log('form is ', form);
        console.log('formControl is ', formControl);
        setForm({ ...form, [name]: formControl });
    }, [form, getValidityOfFormControl]);

    const renderFormControls = () => {
        const formControls = Object.values(form);
        const jsxElements = formControls.map((control) => {
            const renderControl = control.renderControl;
            // we dont want access to the renderControl method within our component, so null it out.
            const c = { ...control, renderControl: null };
            return renderControl(c, onControlChange, onBlurChange, control.id);
        });
        return jsxElements;
    };

    /**
     returns a boolean value indicating whether overall form is valid.
     If any FormControl is invalid, then the whole form is invalid.
     */
    const isFormValid = useCallback(() => {
        let isValid = true;
        const formControls = Object.values(form);

        for (let i = 0; i < formControls.length; i++) {
            const control = formControls[i];
            if (!control.isValid) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }, [form]);

    return { renderFormControls, isFormValid };
};

export default  useForm;