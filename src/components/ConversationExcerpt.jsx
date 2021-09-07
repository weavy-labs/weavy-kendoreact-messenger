import React, { Fragment } from 'react';
import useTyping from '../hooks/useTyping';

const ConversationExcerpt = (props) => {
    const { isTyping, typers } = useTyping(props.id);

    return (
        <Fragment>
            {isTyping &&
                <small><em>{typers.join(", ")} {typers.length > 1 ? "are" : "is"} typing...</em></small>
            }

            {!isTyping &&
                <div className="text-truncate">{props.excerpt}</div>
            }
        </Fragment>
    );
}
export default React.memo(ConversationExcerpt);