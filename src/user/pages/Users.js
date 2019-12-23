import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {id: 'u1', name: 'Max Schwartz', image: 'https://image.flaticon.com/icons/png/128/149/149071.png', places: 3}
    ];
    return <UsersList items={USERS}/>;
};

export default Users;