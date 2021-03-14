import React from 'react';

import Button from '../../../shared/components/FormElements/Button';
import useForm from '../../../shared/utils/useForm';

import './NewPlace.css';
import { New_Place_Form_Config } from './NewPlaceFormConifg';

const NewPlace = () => {
    const { renderFormControls, isFormValid } = useForm(New_Place_Form_Config);

    const addPlace = (event) => {
        event.preventDefault(); // Don't refresh the page
        // console.log('The form values are ', formValues);
        // If the form is not valid, just return. Safety check.
        if (!isFormValid()) {
            return;
        }
    };

    return (
        <form className="place-form">
            {renderFormControls()}
            <Button type="submit" onClick={addPlace} disabled={!isFormValid()}>ADD PLACE</Button>
        </form>
    );
};

export default NewPlace;