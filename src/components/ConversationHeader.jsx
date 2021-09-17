import { Fragment, React, useEffect, useState } from "react";
import useMetaData from "../hooks/useMetaData";
import useTyping from "../hooks/useTyping";
import Details from "./Details";
import { useParams } from "react-router-dom";

const ConversationHeader = () => {
  let { id } = useParams();

  const { id: cid, title } = useMetaData(id);
  const { isTyping, typers } = useTyping(id);
 
  return (
    <Fragment>
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
      <div>
        <Details />
      </div>
    </Fragment>
  );
};

export default ConversationHeader;