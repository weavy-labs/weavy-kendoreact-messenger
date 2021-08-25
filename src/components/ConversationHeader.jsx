import { Fragment, React, useEffect, useState } from 'react';
import useRealTime from '../hooks/useRealTime';
import useMetaData from '../hooks/useMetaData';
import { useParams, withRouter } from "react-router-dom";

const ConversationHeader = (props) => {

    let { id } = useParams();
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setIsTyping(false);
    }, [id])

    const handleTyping = (data) => {
        const conversationId = data.conversation;
        
        if (conversationId == id) {
            setIsTyping(true);
        }
    }

    useRealTime(handleTyping, "typing.weavy");
    const { id: cid, title } = useMetaData(id);

    return (

        <Fragment>
            {isTyping &&
                <div>Typing...</div>
            }
            {!isTyping &&
                <div>{title} - {cid}</div>
            }
        </Fragment>


    );

}

export default ConversationHeader;