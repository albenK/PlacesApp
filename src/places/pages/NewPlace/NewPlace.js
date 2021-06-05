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
import ImageUpload from '../../../shared/components/FormElements/ImageUpload/ImageUpload';

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
            const formData = new FormData();
            formData.append('title', formControls.title.value);
            formData.append('description', formControls.description.value);
            formData.append('address', formControls.address.value);
            formData.append('creator', auth.userId);
            formData.append('image', formControls.placeImage.value[0]); // value is FileList, so value[0] will be the file.
            await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            );
            history.push('/'); // navigate user to root page.
        } catch (err) {}
    };

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay/> }
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={addPlace}>
                <Input
                    element={formControls.title.elementConfigs.element}
                    type={formControls.title.elementConfigs.type}
                    autoComplete={formControls.title.elementConfigs.autoComplete}
                    { ...formControls.title }
                    handleChange={onControlChange}
                    handleBlur={onControlBlur}
                />

                <Input
                    element={formControls.description.elementConfigs.element}
                    type={formControls.description.elementConfigs.type}
                    autoComplete={formControls.description.elementConfigs.autoComplete}
                    { ...formControls.description }
                    handleChange={onControlChange}
                    handleBlur={onControlBlur}
                />

                <Input
                    element={formControls.address.elementConfigs.element}
                    type={formControls.address.elementConfigs.type}
                    autoComplete={formControls.address.elementConfigs.autoComplete}
                    { ...formControls.address }
                    handleChange={onControlChange}
                    handleBlur={onControlBlur}
                />

                <ImageUpload
                    id={formControls.placeImage.id}
                    name={formControls.placeImage.name}
                    accept={formControls.placeImage.elementConfigs.accept}
                    isValid={formControls.placeImage.isValid}
                    isTouched={formControls.placeImage.isTouched}
                    errorMessage={formControls.placeImage.errorMessage}
                    onInput={onControlChange}
                />
                <Button type="submit" disabled={!isFormValid()}>ADD PLACE</Button>
            </form>
        </React.Fragment>
    );
};

export default NewPlace;