import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../../shared/components/UIElements/Card/Card';
import Button from '../../../shared/components/FormElements/Button/Button';

import './UpdatePlace.css';

import { DUMMY_PLACES } from '../UserPlaces/UserPlaces';
import useForm from '../../../shared/hooks/useForm/useForm';
import { UPDATE_PLACE_FORM_CONFIG } from './UpdatePlaceFormConfig';
import Input from '../../../shared/components/FormElements/Input/Input';

const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const [place, setPlace] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { getFormControls, isFormValid, onControlChange, onControlBlur, updateControls } = useForm(UPDATE_PLACE_FORM_CONFIG);

    useEffect(() => {
        // TODO: Make http request to backend to retrieve place.
        // Since there's no backend, retrieve from DUMMY_PLACES array.
        // Mimic waiting for http request with setTimeout();
        const timeout = setTimeout(() => {
            const placeToUpdate = DUMMY_PLACES.find(p => p.id === placeId) || null;
            console.log('placeId changed and it\'s value is ', placeId, '. The place is ', placeToUpdate);
            setPlace(placeToUpdate);
            setIsLoading(false);
        }, 2000);

        return () => {
            console.log('timeout is ', timeout);
            if (typeof timeout === 'number') {
                clearTimeout(timeout);
            } 
        }
        
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
        console.log('form state is ', getFormControls());
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
    
    if (isLoading) {
        return (
            <div className="center">
                <Card>Loading...</Card>
            </div>
        );
    }
    else if (!isLoading && !place) {
        return (
            <div className="center">
                <Card>Could not find place!</Card>
            </div>
        );
    }

    return (
        <form className="update-place-form" onSubmit={updatePlace}>
            {renderFormControls()}
            <Button type="submit" disabled={!isFormValid()}>UPDATE PLACE</Button>
        </form>
    );
};

export default UpdatePlace;