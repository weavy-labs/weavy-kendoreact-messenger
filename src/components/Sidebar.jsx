import { React } from "react";
import { NavLink } from "react-router-dom";
import { ListView } from "@progress/kendo-react-listview";
import { Avatar } from "@progress/kendo-react-layout";
import { DropDownButton, DropDownButtonItem, Button } from "@progress/kendo-react-buttons";
import ConversationExcerpt from "./ConversationExcerpt";
import Search from "./Search";
import { useQuery, useQueryClient } from "react-query";
import { API_URL } from "../constants";

const Sidebar = (props) => {
  const queryClient = useQueryClient();

  const getConversations = async () => {
    const response = await fetch(API_URL + "/api/conversations", {
      method: "GET",
      credentials: "include",
    });
    const conversations = await response.json();
    return conversations;
  };

  const { isLoading, isError, data, error } = useQuery("conversations", getConversations, { refetchOnWindowFocus: false });

  const onAction = (item) => {
    const actions = ["pin", "unpin", "star", "unstar", "read", "unread"];

    if (actions.includes(item.action)) {
      fetch(`${API_URL}/api/conversations/${item.id}/${item.action}`, {
        method: "POST",
        credentials: "include",
      }).then((response) => {
        if (response.ok) {
          // TODO: better way of doing this?
          queryClient.invalidateQueries(["conversations"]);
        } else {
          console.error(`Failed to ${item.action} conversation: ${response.statusText} (${response.status})`);
        }
      });
    } else {
      console.error("Unsupported action: " + item.action);
    }
  };

  const MyItemRender = (props) => {
    let item = props.dataItem;

    return (
        <div className={!item.is_read ? "conversation-list unread" : "conversation-list"}>
          <NavLink to={"/conversation/" + item.id} activeClassName="active">
            <div className="row p-2 border-bottom align-middle" style={{ margin: 0 }}>
              <div className="col-2">
                <Avatar shape="circle" type="image">
                  <img alt="" src={`${API_URL}/${item.avatar_url.replace("{options}", "48")}`} />
                </Avatar>
              </div>
              <div className="col-10">
                <time className="text-muted" dateTime="{item.last_message_at}" title="{item.last_message_at}">
                  {item.last_message_at_string}
                </time>
                <div className="text-truncate">{item.title}</div>
                <ConversationExcerpt id={item.id} excerpt={item.excerpt}></ConversationExcerpt>
              </div>
            </div>
          </NavLink>
          <div className="actions">
            {item.is_starred && <Button className="transparent" icon="star" onClick={() => onAction({ id: item.id, action: "unstar" })}></Button>}
            <DropDownButton className="transparent" icon={item.is_pinned ? "pin" : "cog"} onItemClick={(event) => onAction(event.item)}>
              {item.is_starred ? <DropDownButtonItem id={item.id} action="unstar" text="Unstar" icon="star-outline"></DropDownButtonItem> : <DropDownButtonItem id={item.id} action="star" text="Star" icon="star"></DropDownButtonItem>}
              {item.is_pinned ? <DropDownButtonItem id={item.id} action="unpin" text="Unpin" icon="unpin"></DropDownButtonItem> : <DropDownButtonItem id={item.id} action="pin" text="Pin" icon="pin"></DropDownButtonItem>}
              {!item.is_read ? (<DropDownButtonItem id={item.id} action="read" text="Mark as read" icon="checkbox"></DropDownButtonItem>) : typeof item.last_message_at !== "undefined" ? (<DropDownButtonItem id={item.id} action="unread" text="Mark as unread" icon="checkbox-checked"></DropDownButtonItem>) : ("")}
            </DropDownButton>
          </div>
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
    <div>
      <Search />
      <ListView data={data} item={MyItemRender} />
    </div>
  );
};

export default Sidebar;
