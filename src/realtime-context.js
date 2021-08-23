import React from 'react';

const RealTimeContext = React.createContext(
    {
        connect: () => null,
        proxy: null
    }
);

export default RealTimeContext