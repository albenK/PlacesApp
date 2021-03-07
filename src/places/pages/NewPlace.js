import React from 'react';

import './NewPlace.css';

import Input from '../../shared/components/FormElements/Input';

const NewPlace = () => {
    return (
        <form className="place-form">
            <Input
                element="input"
                id="new-place-title"
                type="text"
                label="Title"
                validators={[]}
                errorText="Title is required"
            />
        </form>
    );
};

export default NewPlace;