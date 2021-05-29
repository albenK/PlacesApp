import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

import useHttpClient from '../../../shared/hooks/useHttpClient/useHttpClient';

import PlaceList from '../../components/PlaceList/PlaceList';

const UserPlaces = (props) => {
    const [myPlaces, setMyPlaces ] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const urlParams = useParams();
    const userId = urlParams.userId;

    useEffect(() => {
        const getMyPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setMyPlaces(responseData.places);
            } catch (err) {}
        };

        getMyPlaces();
    }, [sendRequest, userId]);

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            <ErrorModal error={error} onClear={clearError} />
            { !isLoading && <PlaceList items={myPlaces}/> }
        </React.Fragment>
    );
};

export default UserPlaces;