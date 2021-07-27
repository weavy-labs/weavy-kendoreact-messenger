import { useState } from "react";
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { Chat, ChatMessage } from '@progress/kendo-react-conversational-ui';


const user = {
  id: 1,
  avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
};

const App = () => {

  const [messages, setMessages] = useState([]);

  const addNewMessage = (event) => {
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
      return <img src={attachment.content} draggable={false} />;
    } else if (attachment.contentType === "text/plain") {
      return attachment.content;
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      <Chat
        user={user}
        messages={messages}
        onMessageSend={addNewMessage}
        placeholder={"Type a message..."}
        messageTemplate={MessageTemplate}
        message={CustomChatMessage}
        attachmentTemplate={AttachmentTemplate}
      />

    </div>
  );
}

export default App;
