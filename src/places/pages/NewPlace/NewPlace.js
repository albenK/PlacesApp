import React from 'react';

import Button from '../../../shared/components/FormElements/Button/Button';
import useForm from '../../../shared/hooks/useForm';

import './NewPlace.css';
import { New_Place_Form_Config } from './NewPlaceFormConfig';

const NewPlace = () => {
    const { getFormValues,renderFormControls, isFormValid } = useForm(New_Place_Form_Config);

    const addPlace = (event) => {
        event.preventDefault(); // Don't refresh the page
        console.log('The form values are ', getFormValues());
        // If the form is not valid, just return. Safety check.
        if (!isFormValid()) {
            return;
        }
        // TODO: Make http request to backend
    };

    return (
        <form className="place-form" onSubmit={addPlace}>
            {renderFormControls()}
            <Button type="submit" onClick={addPlace} disabled={!isFormValid()}>ADD PLACE</Button>
        </form>
    );
};

export default NewPlace;