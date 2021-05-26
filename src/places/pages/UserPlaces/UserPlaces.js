import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

import useHttpClient from '../../../shared/hooks/useHttpClient/useHttpClient';

import PlaceList from '../../components/PlaceList/PlaceList';

export const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous skyscrapers in the world',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/220px-Empire_State_Building_from_the_Top_of_the_Rock.jpg',
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1',
        location: {lat: 40.7484405, lng: -73.9878531}
    
    },
    {
        id: 'p2',
        title: 'Empire State Building with id p2',
        description: 'One of the most famous p2 skyscrapers in the world',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/220px-Empire_State_Building_from_the_Top_of_the_Rock.jpg',
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u2',
        location: {lat: 40.7484405, lng: -73.9878531}
    }
];

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