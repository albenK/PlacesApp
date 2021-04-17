import React from 'react';

import Button from '../../../shared/components/FormElements/Button/Button';
import Input from '../../../shared/components/FormElements/Input/Input';
import useForm from '../../../shared/hooks/useForm';

import './NewPlace.css';
import { New_Place_Form_Config } from './NewPlaceFormConfig';

const NewPlace = () => {
    const { getFormControls, isFormValid, onControlChange, onControlBlur } = useForm(New_Place_Form_Config);

    const addPlace = (event) => {
        event.preventDefault(); // Don't refresh the page
        
        console.log('The form state is ', getFormControls());
        // If the form is not valid, just return. Safety check.
        if (!isFormValid()) {
            console.log('form is invalid!');
            return;
        }
        // TODO: Make http request to backend
    };

    const renderFormControls = () => {
        const controls = getFormControls();
        return Object.values(controls).map(control => {
            return (
                <Input
                    key={control.id}
                    element={control.elementConfigs.element}
                    type={control.elementConfigs.type}
                    {...control}
                    handleChange={onControlChange}
                    handleBlur={onControlBlur}
                />
            );
        });
    };

    return (
        <form className="place-form" onSubmit={addPlace}>
            {renderFormControls()}
            <Button type="submit" disabled={!isFormValid()}>ADD PLACE</Button>
        </form>
    );
};

export default NewPlace;