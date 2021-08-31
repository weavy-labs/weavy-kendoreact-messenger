import { Fragment, React } from 'react';
import useMetaData from '../hooks/useMetaData';
import useTyping from '../hooks/useTyping';
import { useParams } from "react-router-dom";

const ConversationHeader = (props) => {

    let { id } = useParams();
   
    const { id: cid, title } = useMetaData(id);
    const isTyping = useTyping(id);

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