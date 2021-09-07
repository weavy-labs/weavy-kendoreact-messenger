import { useEffect, useState } from "react";
import useRealTime from '../hooks/useRealTime';

function useTyping(id) {

    const [isTyping, setIsTyping] = useState(null);
    const [typers, setTypers] = useState([]);    
    const message = useRealTime("typing.weavy");
    

    useEffect(() => {                
        let tid = null;
        if (message && message.conversation == id) {                          
            setIsTyping(true);                            
            if(typers.indexOf(message.user.name) === -1){
                setTypers([...typers, message.user.name]);            
            }                

            tid = window.setTimeout(() => {
                setIsTyping(false);
            }, 5000);
        }

        return () => {    
            window.clearTimeout(tid)
        }
    
    }, [message, id, typers]);    
    
    return { isTyping, typers };
   
}

export default useTyping;