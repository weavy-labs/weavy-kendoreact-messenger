import { React, Fragment, createRef, useState } from "react";
import { Chat, ChatMessage } from "@progress/kendo-react-conversational-ui";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import useRealTime from "../hooks/useRealTime";
import { API_URL } from "../constants";
import ConversationHeader from "./ConversationHeader";
import { Route, NavLink, useRouteMatch } from "react-router-dom";

const Conversation = () => {
  let { id } = useParams();
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries(["messages", id]);
  };

  useRealTime(invalidate, "message-inserted.weavy");

  const getMessages = async () => {
    const response = await fetch(
      API_URL + "/api/conversations/" + id + "/messages",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const messages = await response.json();

    return messages.data?.map((item) => {
      return {
        text: item.text,
        timestamp: new Date(item.created_at),
        author: {
          id: item.created_by.id,
          name: item.created_by.name,
          avatarUrl:
            API_URL + `${item.created_by.thumb.replace("{options}", "32")}`,
        },
        attachments: item.attachments,
        // attachments: item.attachments.map((a) => {
        //     return {
        //         content: "https://showcase.weavycloud.com/attachments/" + a + "/image.png",
        //         contentType: "image",
        //     }
        // })
      };
    });
  };
  const { isLoading, isError, data, error } = useQuery(
    ["messages", id],
    getMessages,
    { refetchOnWindowFocus: false }
  );

  const user = {
    id: 3,
    avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
  };

  const fileUpload = createRef();

  const [attachments, setAttachments] = useState([]);

  const addMessage = async (message) => {
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

  const addMessageMutation = useMutation(addMessage, {
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
    },
  });

  const uploadFiles = async (data) => {
    return fetch(API_URL + "/a/blobs/", {
      method: "POST",
      credentials: "include",
      body: data,
    });
  };

  const insertMessage = (message) => {
    addMessageMutation.mutate(message);
  };

  const addNewMessage = (event) => {
    insertMessage(event.message);

    // //event.message.typing = true;
    // event.message.attachments = [
    //     {
    //         content: "A link to Google",
    //         site: "https://google.com",
    //         contentType: "link"
    //     },

    //     {
    //         content: "A link to Weavy",
    //         site: "https://weavy.com",
    //         contentType: "link"
    //     }
    // ]
    // setMessages([...messages, event.message]);
  };

  const handleInputChange = async (e) => {
    var files = e.target.files;

    if (files.length > 0) {
      // add files to formdata object
      var formData = new FormData();
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        formData.append("file-" + index, file);
      }

      var response = await uploadFiles(formData);
      var json = await response.json();

      setAttachments([...attachments, ...json.data]);
    }
  };

  const CustomChatMessage = (props) => (
    <ChatMessage {...props} dateFormat={"t"} />
  );

  const CustomUploadButton = (props) => {
    return (
      <Fragment>
        <input
          type="file"
          onChange={handleInputChange}
          style={{
            display: "none",
          }}
          ref={fileUpload}
        />
        <button
          className={"k-button k-flat k-button-icon"}
          onClick={() => fileUpload.current.click()}
        >
          <span
            className={"k-icon " + props.icon}
            style={{
              fontSize: "20px",
            }}
          />
        </button>
      </Fragment>
    );
  };

  const CustomMessage = (props) => {
    return (
      <Fragment>
        <div>
          Attachments:
          {attachments.map((a) => {
            return (
              <div>
                <img
                  alt=""
                  src={API_URL + `/${a.thumb.replace("{options}", "16")}`}
                />
                {a.name}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          {CustomUploadButton({
            icon: "k-i-image-insert",
          })}
          {props.messageInput}
          {props.sendButton}
        </div>
      </Fragment>
    );
  };

  const CustomAttachmentTemplate = (props) => {
    let attachment = props.item;
    return (
      <a
        href={attachment.site}
        target="_blank"
        draggable={false}
        tabIndex={-1}
        rel="noopener noreferrer"
      >
        <img
          alt=""
          style={{
            width: 250,
          }}
          src={API_URL + "/attachments/" + attachment + "/image.png"}
          draggable={false}
        />
      </a>
    );
    //  return (
    //     <div className="k-card">
    //         <div className="k-card-body">
    //         <img alt="" src={"https://showcase.weavycloud.com/attachments/" + attachment + "/image.png"} draggable={false} rel="noopener noreferrer"/>;
    //         </div>
    //     </div>
    // );

    // if (attachment.contentType === "link") {
    //     return (
    //         <div className="k-card">
    //             <div className="k-card-body">
    //                 <a
    //                     href={attachment.site}
    //                     target="_blank"
    //                     draggable={false}
    //                     tabIndex={-1}
    //                     rel="noopener noreferrer"
    //                 >
    //                     {attachment.content}
    //                 </a>
    //             </div>
    //         </div>
    //     );
    // } else if (attachment.contentType.match("^image")) {
    //     return <img alt="" src={attachment.content} draggable={false} />;
    // } else if (attachment.contentType === "text/plain") {
    //     return attachment.content;
    // } else {
    //     return null;
    // }
  };

  // const CustomMessageTemplate = (props) => {
  //     return (
  //         <div className="k-bubble">
  //             <div>This is the message: {props.item.text}</div>
  //         </div>
  //     );
  // };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Fragment>
      <header className="pane-header">
        <NavLink to="/">Back</NavLink>       
        <ConversationHeader />
      </header>
      <div className="pane-body">
        <Chat
          user={user}
          messages={data}
          onMessageSend={addNewMessage}
          placeholder={"Type a message..."}
          //messageTemplate={CustomMessageTemplate}
          messageBox={CustomMessage}
          message={CustomChatMessage}
          attachmentTemplate={CustomAttachmentTemplate}
          width={"100%"}
        />
      </div>
    </Fragment>
  );
};

export default Conversation;
