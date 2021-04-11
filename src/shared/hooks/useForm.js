import { useCallback, useState } from "react";

const useForm = (formObject) => {
    // TODO: Maybe try using useReducer instead of useState. This could improve performance.
    // Right now all of the useCallback() functions have dependency on form, so it will create new
    // function reference. Using useReducer may help since we can just call dispatch({ ... }) and have no dependency.
    const [form, setForm] = useState(formObject);

    /**
    This method will set the error message for the formControl and return a boolean
    indicating whether or not this formControl is valid.
     */
    const getValidityOfFormControl = useCallback((formControl) => {
        let isValid = true;
        const validationRules = formControl.validationRules || [];
        for (let i = 0; i < validationRules.length; i++) {
            const validationRule = validationRules[i];
            const valid = validationRule.validate(formControl.value, form);
            // if this validation rule has failed, set the error message and break out of loop
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

    /**
     returns an array of JSX elements we want to render within our form.
     This will use the JSX element we return within the renderControl() method of the FormConfig object.
     */
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
     Updates the value of properties on form controls.
     @param {Array<any>} controlsToUpdate - An array of objects representing the controls to update.
     For example: [{name: 'title', propsToUpdate: {value: 'New value', isTouched: true}}, { name: 'description', propsToUpdate: {value: 'Some value', isValid: true}}]
     will update the value and isTouched for title and update the value and isValid for description.
     @param {boolean} shouldRunValidationRules - A boolean flag to indicate whether the validation rules
     should be run. Default value is false.
     */
    const updateControls = useCallback((controlsToUpdate, shouldRunValidationRules = false) => {
        console.log('calling updateControls');
        if (!controlsToUpdate || !Array.isArray(controlsToUpdate)) {
            throw new Error(`arg ${controlsToUpdate} is not a supported argument`);
        }
        const newForm = { ...form };

        for (let i = 0; i < controlsToUpdate.length; i++) {
            const updateControlObj = controlsToUpdate[i]; // { name: string, propsToUpdate: {...} }
            if (!newForm[updateControlObj.name]) { // safety check
                throw new Error(`The ${updateControlObj.name} FormControl wasn't found in the form.`);
            }
            const propsToUpdate = updateControlObj.propsToUpdate;
            // Loop through the propsToUpdate object and set values.
            const keys = Object.keys(propsToUpdate);
            const formControl = newForm[updateControlObj.name];
            for (let j = 0; j < keys.length; j++) {
                const property = keys[j];
                // safety check. We dont want to add random properties.
                if (!formControl.hasOwnProperty(property)) {
                    throw new Error(`Property ${property} doesn't exist for ${updateControlObj.name} formControl.`);
                }
                const newValue = propsToUpdate[property];
                formControl[property] = newValue; // update the property with the new value
                // run the validation rules if necessary.
                /* TODO: Maybe extract this logic into another function since we're using this
                within onControlChange, onBlurChange and now here.*/
                if (shouldRunValidationRules) {
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
                }
            }
        }
        console.log('newForm is ', newForm);
        setForm({ ...newForm });
    }, [form, getValidityOfFormControl]);

    /**
        Add new controls to the form.
        @param {Array<any>} controlsToAdd - An array of controls to add.
        For example: [{renderControls: () => { ... }, id: 'fullName', label: 'Full Name', name: 'fullname', value: '', placeholder: '', isValid: false, isTouched: false, errorMessage: '', validationRules: [ ...]}, { ... }]
     */
    const addControls = useCallback((controlsToAdd) => {
        if (!controlsToAdd || !Array.isArray(controlsToAdd)) {
            throw new Error(`arg ${controlsToAdd} is not a valid argument.`);
        }

        const newForm = { ...form };
        // Loop through the array and add controls to newForm.
        for (let i = 0; i < controlsToAdd.length; i++) {
            const controlToAdd = controlsToAdd[i]; // { renderControl: () => { ... }, id: 'id', label: '', name ... }
            newForm[controlToAdd.name] = { ...controlToAdd };
        }

        setForm({ ...newForm });
    }, [form]);

    /**
        Remove controls from the form.
        @param {Array<string>} controlsToRemove - An array of controls to remove.
        Each element in the array will be a string and it should be the name of the form control to remove.
        For example: ['fullname', 'email', 'password'] will remove the fullname, email and password controls from the form.
     */
    const removeControls = useCallback((controlsToRemove) => {
        if (!controlsToRemove || !Array.isArray(controlsToRemove)) {
            throw new Error(`arg ${controlsToRemove} is not a valid argument.`);
        }

        const newForm = { ...form };
        // loop through array and delete key-value pairs from the form.
        for (let i = 0; i < controlsToRemove.length; i++) {
            const name = controlsToRemove[i];
            delete newForm[name];
        }

        setForm({ ...newForm });
    }, [form]);

    /**
        Set the form. This function can be used to reset the entire form if needed.
        @param formObj - object representation of the form.
        For example: { 'fullname': {renderControls: () => { ... }, id: 'fullName', label: 'Full Name', name: 'fullname', value: '', placeholder: '', isValid: false, isTouched: false, errorMessage: '', validationRules: [ ...]}, 'email': { ... }, ... }
     */
    const setTheForm = useCallback((formObj) => {
        const newForm = { ...formObj };
        setForm({ ...newForm });
    }, []);

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

    /**
     returns the values of the form. Each key in this object represents
     the name of the FormControl. The value for the key will be an object
     that has an isValid property and a value property.
     */
    const getFormValues = useCallback(() => {
        const values = {};
        const formControlNames = Object.keys(form);
        for (let i = 0; i < formControlNames.length; i++) {
            const name = formControlNames[i];
            values[name] = {};
            values[name]['isValid'] = form[name]['isValid'];
            values[name]['value'] = form[name]['value'];
        }
        return values;
    }, [form]);

    return { 
        getFormValues,
        renderFormControls,
        isFormValid,
        updateControls,
        addControls,
        removeControls,
        setTheForm
    };
};

export default  useForm;