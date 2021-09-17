import { React, Fragment, useState } from "react";
import { Chat } from "@progress/kendo-react-conversational-ui";
import { useParams, NavLink } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import ConversationHeader from "./ConversationHeader";
import { CustomChatMessage, CustomAttachmentTemplate } from "./ConversationalUI";
import useRealTime from "../hooks/useRealTime";
import useMessages from "../hooks/useMessages";
import useMessageBox from "../hooks/useMessageBox";
import { API_URL } from "../constants";


const Conversation = ({ user }) => {
  let { id } = useParams();
  const queryClient = useQueryClient();
  const [attachments, setAttachments] = useState([]);
  const { isLoading, isError, data, error } = useMessages(id);

  // todo: use this when implementing attachments...
  const customMessageBox = useMessageBox(id, attachments, setAttachments);

  // add incoming message from realtime
  const addFromRealTime = (message) => {
    if (message.createdBy.id == user.id || message.conversation != id) return;    
    addMessageFromRealTimeMutation.mutate(message)
  };

  /// update the whole conversation
  const updateConversation = () => {
    queryClient.invalidateQueries(["messages", id]);
  }

  useRealTime("message-inserted.weavy", addFromRealTime);
  useRealTime("conversation-read.weavy", updateConversation);

  /// map a Weavy realtime message to the expected message model format
  const mapMessageFromRealTime = (item) => {
    console.log(item)
    return {
      text: item.text,
      timestamp: new Date(item.createdAt),
      author: {
        id: item.createdBy.id,
        name: item.createdBy.name,
        avatarUrl:
          API_URL + `${item.createdBy.thumb.replace("{options}", "32")}`,
      },      
       attachments: item.attachments.map((a) => {
           return {
             id: a,
             download: "",
             thumb: "",
              kind: "document",
               kind: "https://showcase.weavycloud.com/attachments/" + a + "/image.png",
               contentType: "image",
           }
       })
    };
  }

  /// post a new message to Weavy
  const postMessage = async (message) => {
    let files = attachments.map((f) => {
      return f.id;
    });

    let json = JSON.stringify({ text: message.text, blobs: files });

    return fetch(API_URL + "/a/conversations/" + id + "/messages", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: json,
    });
  };

  /// add message from realtime mutation
  const addMessageFromRealTimeMutation = useMutation(newMessage => {
    queryClient.invalidateQueries(["messages", id]);
    //queryClient.setQueryData(["messages", id], (old) => [...old, mapMessageFromRealTime(newMessage)]);
  });

  /// add message mutation
  const addMessageMutation = useMutation(postMessage, {
    // When mutate is called:
    onMutate: async (newMessage) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["messages", id]);

      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData(["messages", id]);

      if (typeof previousMessages !== "undefined") {
        // Optimistically update to the new value
        queryClient.setQueryData(["messages", id], (old) => [
          ...old,
          newMessage,
        ]);

        // Return a context object with the snapshotted value
        return { previousMessages };
      }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newMessage, context) => {
      queryClient.setQueryData(["messages", id], context.previousMessages);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["messages", id]);
      // TODO: should probably only invalidate the specific conversation - not all of them
      queryClient.invalidateQueries(["conversations"]);

      // clear attachments
      setAttachments([]);
    },
  });

  /// send message event handler
  const handleMessageSend = (event) => {
    addMessageMutation.mutate(event.message);
  };

  /// TODO: Why can't this template be moved outside and imported. Investigate!!
  const CustomMessageTemplate = (props) => {
    if(!props.item.text ) return (<Fragment></Fragment>)
    return (
      <div>
        <div className="k-bubble">
          <div>{props.item.text}</div>
        </div>
        {props.item.seenBy && props.item.seenBy.map(m => {
          return <img alt="" key={m.id} style={{ borderRadius: '50%' }} src={API_URL + `${m.thumb.replace("{options}", "16")}`} title={"Seen by " + m.name + " " + new Date(m.read_at).toLocaleString()} />
        })}
      </div>

    );
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Fragment>
      <header className="pane-header">
        <NavLink className="navigate-back" to="/">Back</NavLink>
        <ConversationHeader />
      </header>
      <div className="pane-body">
        <Chat
          user={user}
          messages={data}
          onMessageSend={handleMessageSend}
          placeholder={"Type a message..."}
          messageTemplate={CustomMessageTemplate}
          messageBox={customMessageBox}
          message={CustomChatMessage}
          attachmentTemplate={CustomAttachmentTemplate}
          width={"100%"}
        />
      </div>
    </Fragment>
  );
};

export default Conversation;
