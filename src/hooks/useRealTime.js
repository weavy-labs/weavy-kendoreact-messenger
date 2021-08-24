import { useContext, useEffect, useState } from 'react';
import RealTimeContext from '../realtime-context';

function useRealTime(updateFn, message) {
    const { proxy } = useContext(RealTimeContext);
    const [ lastMessage, setLastMessage ] = useState(null)

    useEffect(() => {
        if (!proxy) return;

        const handleReceiveMessage = (type, data) => {
            switch (type) {
                case message:
                    setLastMessage(JSON.parse(data));
                    if(updateFn){
                        updateFn.call(this, data);
                    }
                    
                    break;
                default:
            }
        }

        proxy.on('eventReceived', handleReceiveMessage);

        return () => {
            proxy.off('eventReceived', handleReceiveMessage);
        }
    }, [proxy, message, updateFn]);

    return lastMessage;
}

export default useRealTime;