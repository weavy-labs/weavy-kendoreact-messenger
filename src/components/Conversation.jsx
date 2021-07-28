import { React, useState, useEffect } from 'react';
import { Chat, ChatMessage } from '@progress/kendo-react-conversational-ui';
import { useParams } from "react-router-dom";

const Conversation = () => {

    let { id } = useParams();

    const [messages, setMessages] = useState([]);

    const user = {
        id: 1,
        avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
    };

    useEffect(() => {
        setMessages([
            {
                text: "This is a generated message for conversation " + id,
                author: {}
            }])
    }, [id])

    const addNewMessage = (event) => {
        //event.message.typing = true;
        event.message.attachments = [
            {
                content: "A link to Google",
                site: "https://google.com",
                contentType: "link"
            },

            {
                content: "A link to Weavy",
                site: "https://weavy.com",
                contentType: "link"
            }
        ]
        setMessages([...messages, event.message]);
    }

    const CustomChatMessage = (props) => (
        <ChatMessage {...props} dateFormat={"t"} />
    );

    const MessageTemplate = (props) => {
        return (
            <div className="k-bubble">
                <div>This is the message: {props.item.text}</div>
            </div>
        );
    };

    const AttachmentTemplate = (props) => {
        let attachment = props.item;

        if (attachment.contentType === "link") {
            return (
                <div className="k-card">
                    <div className="k-card-body">
                        <a
                            href={attachment.site}
                            target="_blank"
                            draggable={false}
                            tabIndex={-1}
                            rel="noopener noreferrer"
                        >
                            {attachment.content}
                        </a>
                    </div>
                </div>
            );
        } else if (attachment.contentType.match("^image/")) {
            return <img alt="" src={attachment.content} draggable={false} />;
        } else if (attachment.contentType === "text/plain") {
            return attachment.content;
        } else {
            return null;
        }
    };



    return (
        <div>
            <h3>ID: {id}</h3>
            <Chat
                user={user}
                messages={messages}
                onMessageSend={addNewMessage}
                placeholder={"Type a message..."}
                messageTemplate={MessageTemplate}
                message={CustomChatMessage}
                attachmentTemplate={AttachmentTemplate}
                width={600}
            />
        </div>

    )
}

export default Conversation;