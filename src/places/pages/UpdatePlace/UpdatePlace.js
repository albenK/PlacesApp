import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../../shared/components/UIElements/Card/Card';
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

import useForm from '../../../shared/hooks/useForm/useForm';
import useHttpClient from '../../../shared/hooks/useHttpClient/useHttpClient'
;
import './UpdatePlace.css';

import { DUMMY_PLACES } from '../UserPlaces/UserPlaces';
import { UPDATE_PLACE_FORM_CONFIG } from './UpdatePlaceFormConfig';


const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { getFormControls, isFormValid, onControlChange, onControlBlur, updateControls } = useForm(UPDATE_PLACE_FORM_CONFIG);
    const formControls = getFormControls();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        // TODO: Make http request to backend to retrieve place.
        // Since there's no backend, retrieve from DUMMY_PLACES array.
        // Mimic waiting for http request with setTimeout();

        // const timeout = setTimeout(() => {
        //     const placeToUpdate = DUMMY_PLACES.find(p => p.id === placeId) || null;
        //     console.log('placeId changed and it\'s value is ', placeId, '. The place is ', placeToUpdate);
        //     setPlace(placeToUpdate);
        // }, 2000);
        const getPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setPlace(responseData.place);
            } catch (err) {}
        };

        getPlace();

        // return () => {
        //     console.log('timeout is ', timeout);
        //     if (typeof timeout === 'number') {
        //         clearTimeout(timeout);
        //     } 
        // }
        
    }, [placeId]);

    useEffect(() => {
        console.log('The value of place has changed.', place);
        if (!place) { return; }
        // update the values of title and description form controls to prefill them
        updateControls(
            [
                { name: 'title', propsToUpdate: { value: place.title || '' } },
                { name: 'description', propsToUpdate: { value: place.description || ''} }
            ],
            true
        );
        /* This eslint rule is needed to hide a warning about adding updateControls as a
        dependency for this useEffect Hook. */
        // eslint-disable-next-line
    }, [place]);


    const updatePlace = (event) => {
        event.preventDefault(); // dont refresh the page.
        console.log('form state is ', formControls);
        if (!isFormValid()) {
            return;
        }
        // TODO: Make HTTP request to backend to update the place.
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
            { isLoading && <LoadingSpinner asOverlay /> }
            { 
                !isLoading && !place && ( 
                    <div className="center">
                        <Card>Could not find place!</Card>
                    </div>
                )
            }
            {
                !isLoading && place && (
                    <form className="update-place-form" onSubmit={updatePlace}>
                        { renderFormControls() }
                        <Button type="submit" disabled={!isFormValid()}>UPDATE PLACE</Button>
                    </form>
                )
            }
        </React.Fragment>
    );
};

export default UpdatePlace;