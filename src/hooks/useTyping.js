import { useState } from "react";
import useRealTime from '../hooks/useRealTime';

function useTyping(id) {

    const [isTyping, setIsTyping] = useState(null);
    const [typers, setTypers] = useState([]);


    const handleTyping = (data) => {        
        const conversationId = data.conversation;
        
        if (conversationId == id) {            
            setIsTyping(true);

            // todo: set typers
        }
    }

    useRealTime(handleTyping, "typing.weavy");

    return isTyping;
   
}

export default useTyping;