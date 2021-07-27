import { React, useState } from 'react';
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { Switch, Route, withRouter } from "react-router-dom";
import { Chat, ChatMessage } from '@progress/kendo-react-conversational-ui';

const Sidebar = (props) => {

    const user = {
        id: 1,
        avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
    };

    const items = [
        {
            text: "Home",
            //icon: "k-i-inbox",
            selected: true,
            route: "/",
        },
        {
            text: "About",
            //icon: "k-i-inbox",      
            route: "/about",
        },
    ];

    const getSelectedItem = (pathName) => {
        let currentPath = items.find(item => item.route === pathName);
        if (currentPath.text) {
            return currentPath.text;
        }
    }

    const onSelect = (e) => {
        props.history.push(e.itemTarget.props.route);

    };

    let selected = getSelectedItem(props.location.pathname);

    const [messages, setMessages] = useState([]);

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
            return <img src={attachment.content} draggable={false} />;
        } else if (attachment.contentType === "text/plain") {
            return attachment.content;
        } else {
            return null;
        }
    };


    return (
        <div>

            <Drawer
                expanded={true}
                position={"start"}
                mode={"push"}
                items={items.map((item) => ({
                    ...item,
                    selected: item.text === selected,
                }))}
                onSelect={onSelect}>
                <Switch>

                    <Route path="/" exact>
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
                    </Route>

                    <Route path="/about">
                        <div>About!</div>
                    </Route>
                </Switch>
            </Drawer>
        </div>
    )
}

export default withRouter(Sidebar);