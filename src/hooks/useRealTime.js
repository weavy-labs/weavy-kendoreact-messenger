import { useContext, useEffect } from 'react';
import RealTimeContext from '../realtime-context';

function useRealTime( messageName, callback) {
    const { proxy } = useContext(RealTimeContext);
    
    useEffect(() => {        
        if (!proxy) return;

        const handleReceiveMessage = (type, data) => {
            switch (type) {
                case messageName:                    
                    if(callback){
                        callback.call(this, JSON.parse(data));
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
}

export default useRealTime;