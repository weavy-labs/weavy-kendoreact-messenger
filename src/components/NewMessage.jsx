import { React, useState } from "react";
import { Button } from "@progress/kendo-react-buttons";

import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { MultiSelect } from "@progress/kendo-react-dropdowns";

import { API_URL } from "../constants";
import Conversation from "./Conversation";

const NewMessage = () => {
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };
  
  const state = {
      data: {}
  }

  const searchMembers = async (event) => {
    const response = await fetch(API_URL + "/api/users?text=" + event.filter, {
      method: "GET",
      credentials: "include",
    });

    this.setState({
        data: await response.json()
    });

  };

  return (
    <div>
      <button className="k-button" onClick={toggleDialog}>
        New message...
      </button>
      {visible && (
        <Dialog title="New message" onClose={toggleDialog}>
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            <MultiSelect
              data={this.state.data}
              filterable={true}
              onFilterChange={searchMembers}
            />
          </p>
          <DialogActionsBar>
            <button className="k-button" onClick={toggleDialog}>
              Cancel
            </button>
            <button className="k-button" onClick={toggleDialog} disabled>
              Create
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default NewMessage;
