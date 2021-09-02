import { Fragment, React } from "react";
import { NavLink } from "react-router-dom";
import { ListView } from "@progress/kendo-react-listview";
import { Avatar } from "@progress/kendo-react-layout";
import { DropDownButton, DropDownButtonItem } from "@progress/kendo-react-buttons";
import ConversationExcerpt from "./ConversationExcerpt";
import { useQuery } from "react-query";
import { API_URL } from "../constants";

const Sidebar = (props) => {
  const getConversations = async () => {
    const response = await fetch(API_URL + "/api/conversations", {
      method: "GET",
      credentials: "include",
    });
    const conversations = await response.json();
    return conversations;
  };

  const { isLoading, isError, data, error } = useQuery(
    "conversations",
    getConversations,
    { refetchOnWindowFocus: false }
  );

  const onClick = (event) => {
    console.log(event.item.action);
  };

  const MyItemRender = (props) => {
    let item = props.dataItem;

    return (
      <div className="conversation-list">
        <NavLink to={"/conversation/" + item.id} activeClassName="active">
          <div className="row p-2 border-bottom align-middle" style={{ margin: 0 }}>
            <div className="col-2">
              <Avatar shape="circle" type="image">
                <img
                  alt=""
                  src={
                    API_URL + `/${item.avatar_url.replace("{options}", "48")}`
                  }
                />
              </Avatar>
            </div>
            <div className="col-10">
              <time className="text-muted" dateTime="{item.created}" title="{item.created}">{item.created_as_string}</time>
              <div className="text-truncate">{item.title}</div>
              <ConversationExcerpt id={item.id} excerpt={item.excerpt}></ConversationExcerpt>
            </div>
          </div>
        </NavLink>
        <DropDownButton icon="cog" onItemClick={onClick}>
            {item.is_starred
            ? <DropDownButtonItem id={item.id} action="unstar" text="Unstar" icon="star-outline"></DropDownButtonItem>
            : <DropDownButtonItem id={item.id} action="star" text="Star" icon="star"></DropDownButtonItem>
            }
            {item.is_pinned
            ? <DropDownButtonItem id={item.id} action="unpin" text="Unpin" icon="unpin"></DropDownButtonItem>
            : <DropDownButtonItem id={item.id} action="pin" text="Pin" icon="pin"></DropDownButtonItem>
            }
            {item.is_read 
            ? <DropDownButtonItem id={item.id} action="read" text="Mark as unread" icon="checkbox"></DropDownButtonItem>
            : <DropDownButtonItem id={item.id} action="unread" text="Mark as read" icon="checkbox-checked"></DropDownButtonItem>
            }
        </DropDownButton>
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
      <ListView data={data} item={MyItemRender} />
    </div>
  );
};

export default Sidebar;
