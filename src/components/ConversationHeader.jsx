import { Fragment, React, useEffect, useState } from 'react';
import useRealTime from '../hooks/useRealTime';
import { useParams, withRouter } from "react-router-dom";

const ConversationHeader = (props) => {

    let { id } = useParams();
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setIsTyping(false);
    }, [id])

    const handleTyping = (data) => {
        const conversationId = data.conversation;
        console.log("ID=", id, conversationId)
        if (conversationId == id) {
            setIsTyping(true);
        }
    }

    useRealTime(handleTyping, "typing.weavy");

    return (

        <Fragment>
            {isTyping &&
                <div>Typing...</div>
            }
            {!isTyping &&
                <div>Conversation Header</div>
            }
        </Fragment>


    );

}

export default withRouter(ConversationHeader);