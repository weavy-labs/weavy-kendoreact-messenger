
import RealTimeContext from './realtime-context';
import { hubConnection } from 'signalr-no-jquery';
import { useState } from 'react';
import { API_URL } from './constants';

const RealTimeProvider = (props) => {
    const [proxy, setProxy] = useState(null);

    const connect = () => {
        const connection = hubConnection(API_URL);
        const hubProxy = connection.createHubProxy('rtm');
        hubProxy.on('init', (type, data) => { }); // dummy event to get signalR started...
        setProxy(hubProxy);

        if (connection) {
            connection.start();
        }
    }

    return (
        <RealTimeContext.Provider value={{
            proxy,
            connect
        }}>
            {props.children}
        </RealTimeContext.Provider>
    );
}

export default RealTimeProvider;