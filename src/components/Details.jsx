import { React, useState, useCallback, Fragment } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import { Avatar } from "@progress/kendo-react-layout";
import { useQueryClient } from "react-query";
import NewMessage from "./NewMessage";
import { useParams } from "react-router-dom";
import useMetaData from "../hooks/useMetaData";
import SelectMembers from "./SelectMembers";
import { API_URL } from "../constants";

const Details = () => {
  let { id } = useParams();

  const { avatar_url, title, members, is_room } = useMetaData(id);
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState(false);
  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [value, setValue] = useState(null);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  function invalidate() {
    queryClient.invalidateQueries(["metadata", id]);
    queryClient.invalidateQueries("conversations");
  }

  const setTitle = async (event) => {
    await fetch(`${API_URL}/api/conversations/${id}/name`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ name: event.target.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    invalidate();
  };

  const onRemoveMember = async (uid) => {
    await fetch(`${API_URL}/api/conversations/${id}/members/${uid}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    invalidate();
  };

  const onAddMember = async () => {
    if (value && value.length > 0) {
      var data = Array.from(value, (x) => x.id);
      await fetch(`${API_URL}/api/conversations/${id}/members`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setValue(null);
      invalidate();
    }
  };

  const onChange = useCallback((event) => {
    const value = event.target.value;
    setValue(value);
  }, []);

  const renderHeader = () => {
    return (
      <ListViewHeader style={{ color: "rgb(160, 160, 160)", fontSize: 14 }} className="pl-1 pb-2 pt-2">
        <div className="row m-0 d-flex align-items-center">
          <div className="col-12">Members</div>
        </div>
      </ListViewHeader>
    );
  };

  const renderMember = (props) => {
    let item = props.dataItem;
    return (
      <div className="row p-1 border-bottom d-flex flex-row align-items-center m-0">
        <div className="col-2">
          <Avatar shape="circle" size="medium">
            <img src={API_URL + item.thumb.replace("{options}", "48")} />
          </Avatar>
        </div>
        <div className="col-8">
          {item.name} <span className="text-muted">@{item.username}</span>
        </div>
        <div className="col-2">
          <Button icon="minus" look="flat" onClick={() => onRemoveMember(item.id)}></Button>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <ListViewHeader style={{ color: "rgb(160, 160, 160)", fontSize: 14 }} className="">
        <div className="row m-0 p-1 py-2">
          <div className="col-10 p-0 pl-2">
            <SelectMembers onMembersChange={onChange} value={value} />
          </div>
          <div className="col-2">
            <Button icon="plus" look="flat" onClick={onAddMember}></Button>
          </div>
        </div>
      </ListViewHeader>
    );
  };

  return (
    <Fragment>
      <Button icon="info" look="clear" onClick={toggleDialog}></Button>
      {visible && (
        <Dialog onClose={toggleDialog} className="details">
          <Button className="close" icon="close" look="clear" onClick={toggleDialog}></Button>
          <div className="cover">
            <img alt="" src={`${API_URL}${avatar_url}`} />
            {is_room && <input type="text" defaultValue={title} onBlur={setTitle} />}
            {!is_room && <span>{title}</span>}
          </div>
          {is_room && (
            <ListView data={members} item={renderMember} style={{ width: "100%" }} header={renderHeader} footer={renderFooter} />
          )}
        </Dialog>
      )}
    </Fragment>
  );
};

export default Details;
