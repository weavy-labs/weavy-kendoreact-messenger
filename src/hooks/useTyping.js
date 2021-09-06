import { useCallback, useEffect, useState } from "react";
import useRealTime from '../hooks/useRealTime';

function useTyping(id) {

    const [isTyping, setIsTyping] = useState(null);
    const [typers, setTypers] = useState([]);
    const message = useRealTime("typing.weavy");


    useEffect(() => {
        if(message){
            console.log(message)
            if (message.conversation == id) {          
                console.log("YES", typers)
                setIsTyping(true);            
                setTypers([...typers, [message.user.name]]);            
            }
        }
    }, [message])

    
    // const handleTyping = (data) => {        
    //     const conversationId = data.conversation;
        
    //     if (conversationId == id) {          
    //         setIsTyping(true);            
    //         setTypers([...typers, [data.user.name]]);            
    //     }
    // };

    

    return { isTyping, typers };
   
}

export default useTyping;