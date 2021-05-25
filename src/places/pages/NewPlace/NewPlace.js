import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../../shared/components/FormElements/Button/Button';
import Input from '../../../shared/components/FormElements/Input/Input';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

import useForm from '../../../shared/hooks/useForm/useForm';
import useHttpClient from '../../../shared/hooks/useHttpClient/useHttpClient';

import { AuthContext } from '../../../shared/context/AuthContext';

import './NewPlace.css';
import { New_Place_Form_Config } from './NewPlaceFormConfig';

const NewPlace = () => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { getFormControls, isFormValid, onControlChange, onControlBlur } = useForm(New_Place_Form_Config);
    const formControls = getFormControls();
    const history = useHistory();

    const addPlace = async (event) => {
        event.preventDefault(); // Don't refresh the page

        // If the form is not valid, just return. Safety check.
        if (!isFormValid()) {
            return;
        }
        try {
            await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                JSON.stringify({
                    title: formControls.title.value,
                    description: formControls.description.value,
                    address: formControls.address.value,
                    creator: auth.userId
                }),
                { 'Content-Type': 'application/json' }
            );
            history.push('/'); // navigate user to root page.
        } catch (err) {}
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
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay/> }
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={addPlace}>
                {renderFormControls()}
                <Button type="submit" disabled={!isFormValid()}>ADD PLACE</Button>
            </form>
        </React.Fragment>
    );
};

export default NewPlace;