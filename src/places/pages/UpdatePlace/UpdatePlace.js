import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../../shared/components/UIElements/Card/Card';
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

import useForm from '../../../shared/hooks/useForm/useForm';
import useHttpClient from '../../../shared/hooks/useHttpClient/useHttpClient';
import { AuthContext } from '../../../shared/context/AuthContext';

import './UpdatePlace.css';
import { UPDATE_PLACE_FORM_CONFIG } from './UpdatePlaceFormConfig';


const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const placeId = useParams().placeId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { getFormControls, isFormValid, onControlChange, onControlBlur, updateControls } = useForm(UPDATE_PLACE_FORM_CONFIG);
    const formControls = getFormControls();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        const getPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setPlace(responseData.place);
            } catch (err) {}
        };

        getPlace();
    }, [sendRequest, placeId]);

    useEffect(() => {
        console.log('The value of place has changed.', place);
        if (!place) { return; }
        // update the values of title and description form controls to prefill them
        updateControls(
            [
                { name: 'title', propsToUpdate: { value: place.title || '' } },
                { name: 'description', propsToUpdate: { value: place.description || '' } }
            ],
            true
        );
        /* This eslint rule is needed to hide a warning about adding updateControls as a
        dependency for this useEffect Hook. If we dont have this eslint rule, this callback
        function will run forever. This can probably be fixed when we use useReducer within the
        useForm Hook.*/
        // eslint-disable-next-line
    }, [place]);


    const updatePlace = async (event) => {
        event.preventDefault(); // dont refresh the page.
        console.log('form state is ', formControls);
        if (!isFormValid()) {
            return;
        }
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formControls.title.value,
                    description: formControls.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push(`/${auth.userId}/places`);
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

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!place && !error) {
        return (
            <div className="center">
                <Card>Could not find place!</Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <form className="update-place-form" onSubmit={updatePlace}>
                { renderFormControls() }
                <Button type="submit" disabled={!isFormValid()}>UPDATE PLACE</Button>
            </form>
        </React.Fragment>
    );
};

export default UpdatePlace;