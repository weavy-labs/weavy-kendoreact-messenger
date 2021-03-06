import { useCallback, useEffect, useState } from "react";
import useRealTime from '../hooks/useRealTime';

function useTyping(id) {

    const [isTyping, setIsTyping] = useState(null);
    const [typers, setTypers] = useState([]);

    const handleTyping = useCallback((data) => {        
        if (data && data.conversation === parseInt(id)) {
            setIsTyping(true);
            if (typers.indexOf(data.user.name) === -1) {
                setTypers([...typers, data.user.name]);
            }
        }
    }, [id, typers])

    const handleStopTyping = useCallback((data) => {
        if (data && data.conversation === parseInt(id)) {            
            setIsTyping(false);
            setTypers([]);
        }
    }, [id]);

    useRealTime("typing.weavy", handleTyping);
    useRealTime("message-inserted.weavy", handleStopTyping);

    useEffect(() => {
        let tid = null;

        if (isTyping) {

            tid = window.setTimeout(() => {
                setIsTyping(false);
                setTypers([]);
            }, 5000);
        }

        return () => {
            window.clearTimeout(tid);
        }

    }, [id, isTyping]);
    
    return { isTyping, typers };

}

export default useTyping;