import React, { useState, useEffect } from 'react';

import useHttpClient from '../../../shared/hooks/useHttpClient/useHttpClient';

import UsersList from '../../components/UserList/UsersList';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

const Users = () => {
    const [ users, setUsers ] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
                setUsers(responseData.users);
            } catch (err) {}
        };

        getUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay/> }
            { !isLoading && <UsersList items={users}/> }
            <ErrorModal error={error} onClear={clearError}/>
        </React.Fragment>
    );
};

export default Users;