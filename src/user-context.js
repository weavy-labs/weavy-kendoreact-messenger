import React from 'react';

const UserContext = React.createContext(
    {
        login: () => null,
        logout: () => null,
        user: null
    }
);

export default UserContext