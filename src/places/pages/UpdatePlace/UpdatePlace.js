import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../../shared/components/UIElements/Card';
import Button from '../../../shared/components/FormElements/Button';

import './UpdatePlace.css';

import { DUMMY_PLACES } from '../UserPlaces/UserPlaces';
import useForm from '../../../shared/hooks/useForm';
import { UPDATE_PLACE_FORM_CONFIG } from './UpdatePlaceFormConfig';

const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const [place, setPlace] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { getFormValues, renderFormControls, isFormValid, updateControls } = useForm(UPDATE_PLACE_FORM_CONFIG);

    useEffect(() => {
        // TODO: Make http request to backend to retrieve place.
        // Since there's no backend, retrieve from DUMMY_PLACES array.
        const placeToUpdate = DUMMY_PLACES.find(p => p.id === placeId) || null;
        console.log('placeId changed and it\'s value is ', placeId, '. The place is ', placeToUpdate);
        setPlace(placeToUpdate);
        setIsLoading(false);
    }, [placeId])

    useEffect(() => {
        console.log('The value of place has changed.', place);
        if (!place) { return; }
        // update the values of title and description form controls to prefill them
        updateControls(
            [
                {name: 'title', propsToUpdate: { value: place.title || ''} },
                {name: 'description', propsToUpdate: { value: place.description || ''} }
            ]
        );
    }, [place])


    const updatePlace = (event) => {
        event.preventDefault(); // dont refresh the browser.
        console.log('form values are ', getFormValues());
        if (!isFormValid()) {
            return;
        }
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
        <form className="update-place-form">
            {renderFormControls()}
            <Button type="submit" disabled={!isFormValid()} onClick={updatePlace}>UPDATE</Button>
        </form>
    );
};

export default UpdatePlace;