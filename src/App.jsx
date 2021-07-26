import * as React from "react";
import logo from './logo.svg';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { Chat } from '@progress/kendo-react-conversational-ui';


const user = {
  id: 1,
  avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
};

const App = () => {

  const [messages, setMessages] = React.useState([]);

  const addNewMessage = (event) => {
    setMessages([...messages, event.message]);
  }

  return (
    <div className="App">
        <Chat
        user={user}
        messages={messages}
        onMessageSend={addNewMessage}
        placeholder={"Type a message..."}
        width={400}
      />
      
    </div>
  );
}

export default App;
