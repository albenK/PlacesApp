import React, { useEffect, useReducer } from 'react';

import { USERS_INITIAL_STATE, USERS_REDUCER, USERS_ACTION_TYPES } from './UsersReducer';

import UsersList from '../../components/UserList/UsersList';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

const Users = () => {
    const [ state, dispatch ] = useReducer(USERS_REDUCER, USERS_INITIAL_STATE);

    useEffect(() => {
        dispatch({ type: USERS_ACTION_TYPES.SET_LOADING, payload: { isLoading: true }});
        const sendRequest = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                dispatch({ type: USERS_ACTION_TYPES.SET_USERS, payload: { users: responseData.users }});
                dispatch({ type: USERS_ACTION_TYPES.SET_LOADING, payload: { isLoading: false }});
            } catch (err) {
                dispatch({ type: USERS_ACTION_TYPES.SET_LOADING, payload: { isLoading: false }});
                dispatch({ type: USERS_ACTION_TYPES.SET_ERROR, payload: { error: err.message || 'Something went wrong. Please try again later' }});
            }
        };

        sendRequest();
    }, []);

    const errorModalCloseHandler = () => {
        dispatch({ type: USERS_ACTION_TYPES.SET_ERROR, payload: { error: null }});
    };

    return (
        <React.Fragment>
            { state.isLoading && <LoadingSpinner asOverlay/> }
            { !state.isLoading && <UsersList items={state.users}/> }
            <ErrorModal error={state.error} onClear={errorModalCloseHandler}/>
        </React.Fragment>
    );
};

export default Users;