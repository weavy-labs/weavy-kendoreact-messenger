import { React, useState, useEffect } from 'react';
import { Chat, ChatMessage } from '@progress/kendo-react-conversational-ui';
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from 'react-query';

const Conversation = () => {

    let { id } = useParams();
    const queryClient = useQueryClient()

    const user = {
        id: 3,
        avatarUrl: "https://via.placeholder.com/24/008000/008000.png",
    };

    const getMessages = async () => {

        const response = await fetch("https://showcase.weavycloud.com/api/conversations/" + id + "/messages",
            {
                method: 'GET',
                credentials: 'include'
            });

        const conversation = await response.json();

        return conversation.data?.map((item) => {
            return {
                text: item.text,
                timestamp: new Date(item.created_at),
                author: {
                    id: item.created_by.id,
                    name: item.created_by.name,
                    avatarUrl: `https://showcase.weavycloud.com/${item.created_by.thumb.replace('{options}', '32')}`
                }
            }
        });
    }

    const addMessage = async (message) => {
        let json = JSON.stringify({ text: message.text });

        return fetch('https://showcase.weavycloud.com/api/conversations/' + id + '/messages', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: json
        });
    }

    const { isLoading, isError, data, error } = useQuery(['messages', id], getMessages);

    const addMessageMutation = useMutation(addMessage, {
        // When mutate is called:
        onMutate: async newMessage => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(['messages', id])

            // Snapshot the previous value
            const previousMessages = queryClient.getQueryData(['messages', id])

            // Optimistically update to the new value
            queryClient.setQueryData(['messages', id], old => [...old, newMessage])

            // Return a context object with the snapshotted value
            return { previousMessages }
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newMessage, context) => {
            queryClient.setQueryData(['messages', id], context.previousMessages)
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries(['messages', id])
        },
    })

    const addNewMessage = (event) => {

        addMessageMutation.mutate(event.message);

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

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }
   

    return (
        <div>
            <h3>ID: {id}</h3>
            <Chat
                user={user}
                messages={data}
                onMessageSend={addNewMessage}
                placeholder={"Type a message..."}
                //messageTemplate={MessageTemplate}
                message={CustomChatMessage}
                attachmentTemplate={AttachmentTemplate}
                width={600}
            />
        </div>

    )
}

export default Conversation;