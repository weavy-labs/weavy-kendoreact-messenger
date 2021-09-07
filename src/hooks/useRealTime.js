import { useContext, useEffect, useState } from 'react';
import RealTimeContext from '../realtime-context';

function useRealTime( messageName, callback) {
    const { proxy } = useContext(RealTimeContext);
    const [ message, setMessage ] = useState(null)

    useEffect(() => {        
        if (!proxy) return;

        const handleReceiveMessage = (type, data) => {
console.log(type, data);

            switch (type) {
                case messageName:
                    const json = JSON.parse(data)
                    setMessage(json);       
                    if(callback){
                        callback.call(this, json);
                    }             
                    break;
                default:
            }
        }

        proxy.on('eventReceived', handleReceiveMessage);

        return () => {
            proxy.off('eventReceived', handleReceiveMessage);
        }
    }, [proxy, messageName, callback]);

    return message;
}

export default useRealTime;