import { useEffect } from "react";
import useRealTime from '../hooks/useRealTime';

function usePresence() {
    const presenceChange = useRealTime("presence-update.weavy");
    
    useEffect(() => {                
        console.log("TEST" + presenceChange);
    }, [presenceChange]);
}

console.log("usepresence");

export default usePresence;