import { Fragment, React } from "react";
import useMetaData from "../hooks/useMetaData";
import useTyping from "../hooks/useTyping";
import Details from "./Details";
import { useParams } from "react-router-dom";

const ConversationHeader = () => {
    let { id } = useParams();

    const { title } = useMetaData(id);
    const { isTyping, typers } = useTyping(id);

    return (
        <Fragment>
            <div className="conversation-header">
                {isTyping && (
                    <small>
                        <em>
                            {typers.join(", ")} {typers.length > 1 ? "are" : "is"} typing...
                        </em>
                    </small>
                )}
                {!isTyping && (
                    <div>
                        {title}
                    </div>
                )}
            </div>

            <div>
                <Details />
            </div>
        </Fragment>
    );
};

export default ConversationHeader;