import { Fragment, React, useEffect, useState } from 'react';
import useTyping from '../hooks/useTyping';

const ConversationExcerpt = ({id, excerpt}) => {   
    const isTyping = useTyping(id);

    return (
        <Fragment>
            {isTyping && 
                <div>Typing...</div>
            }

            {!isTyping && 
                <div className="text-truncate">{excerpt}</div> 
            }
        </Fragment>        
    );
}
export default ConversationExcerpt;