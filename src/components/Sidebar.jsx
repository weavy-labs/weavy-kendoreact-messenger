import { Fragment, React } from "react";
import { NavLink } from "react-router-dom";
import { ListView } from "@progress/kendo-react-listview";
import { Avatar } from "@progress/kendo-react-layout";
import { DropDownButton, DropDownButtonItem, Button } from "@progress/kendo-react-buttons";
import { Skeleton } from "@progress/kendo-react-indicators";
import useRealTime from "../hooks/useRealTime";
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

  const updateConversations = () => {
    queryClient.invalidateQueries(["conversations"]);      
  };

  const updatePresence = (message) => {
    var avatars = document.querySelectorAll(`img.has-presence[src^="${API_URL}/people/${message.user}/avatar"]`);
    avatars.forEach((e) => {
      var container = e.closest(".presence");
      container.classList.remove("away", "active");
      container.classList.add(message.status);
    });
  };

  useRealTime("message-inserted.weavy", updateConversations);
  useRealTime("presence-update.weavy", updatePresence);

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

  const onBeforeNavigate = (id) => {
    var i = data.findIndex((c => c.id == id));
    if (i >= 0) {
      data[i].is_read = true;
    }
  };

  const MyItemRender = (props) => {
    let item = props.dataItem;
    
    return (
      <div className={!item.is_read ? "conversation unread" : "conversation"}>
        <NavLink to={"/conversation/" + item.id} activeClassName="active" onClick={() => onBeforeNavigate(item.id)}>
          <div className="p-2 border-bottom r">
            <div className="left">
              <Avatar shape="circle" type="image" className={typeof item.presence === "undefined" ? "presence" : "presence " + item.presence}>
                <img alt="" className="has-presence" src={`${API_URL}${item.avatar_url.replace("{options}", "48")}`} />
              </Avatar>
            </div>
            <div className="right">
              <time className="text-muted" dateTime={item.last_message_at} title={item.last_message_at}>
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
            {!item.is_read ? (
              <DropDownButtonItem id={item.id} action="read" text="Mark as read" icon="checkbox"></DropDownButtonItem>
            ) : typeof item.last_message_at !== "undefined" ? (
              <DropDownButtonItem id={item.id} action="unread" text="Mark as unread" icon="checkbox-checked"></DropDownButtonItem>
            ) : (
              ""
            )}
          </DropDownButton>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Fragment>
        <div className="row d-flex justify-content-center mx-2">
          <Skeleton shape={"text"} style={{ width: "100%", height: "40px" }} />
        </div>
        <div className="row m-0 mt-2">
          <div className="col-2">
            <Skeleton shape={"circle"} style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="col-10">
            <Skeleton shape={"text"} style={{ width: "60%", height: "20px" }} />
            <Skeleton shape={"text"} style={{ width: "100%", height: "30px" }} />
          </div>
        </div>
        <div className="row m-0 mt-2 d-flex justify-content-center">
          <div className="col-2">
            <Skeleton shape={"circle"} style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="col-10">
            <Skeleton shape={"text"} style={{ width: "60%", height: "20px" }} />
            <Skeleton shape={"text"} style={{ width: "100%", height: "30px" }} />
          </div>
        </div>
        <div className="row m-0 mt-2 d-flex justify-content-center">
          <div className="col-2">
            <Skeleton shape={"circle"} style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="col-10">
            <Skeleton shape={"text"} style={{ width: "60%", height: "20px" }} />
            <Skeleton shape={"text"} style={{ width: "100%", height: "30px" }} />
          </div>
        </div>
      </Fragment>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="conversation-list">
      <Search />
      <ListView data={data} item={MyItemRender} />
    </div>
  );
};

export default Sidebar;
