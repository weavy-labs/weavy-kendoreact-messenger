import { React, useState, useCallback, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import SelectMembers from "./SelectMembers";
import { API_URL } from "../constants";

const textField = "name";
const emptyItem = {
  [textField]: "loading ...",
};
const pageSize = 5;
const loadingData = [];

while (loadingData.length < pageSize) {
  loadingData.push({ ...emptyItem });
}

const NewMessage = () => {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(null);
  let history = useHistory();
  const queryClient = useQueryClient();

  const toggleDialog = () => {
    setValue(null);
    setDisabled(true);
    setVisible(!visible);
  };

  const onChange = useCallback((event) => {
    const value = event.target.value;

    setDisabled(value.length === 0);

    if (value && value[textField] === emptyItem[textField]) {
      return;
    }
    setValue(value);
  }, []);


  const createConversation = async () => {
    const request = await fetch(API_URL + "/api/conversations", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ members: value.map((x) => x.id) }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newConversation = await request.json();
    // reset
    setValue(null);    
    toggleDialog();
    queryClient.invalidateQueries("conversations");
    history.push("/conversation/" + newConversation.id);
  };
  
  return (
    <Fragment>
      <Button icon="plus" look="clear" onClick={toggleDialog}></Button>
      {visible && (
        <Dialog title="New message" onClose={toggleDialog} className="dialog">
            <SelectMembers onMembersChange={onChange} value={value} />
            <DialogActionsBar>
              <Button look="outline" onClick={toggleDialog}>
                Cancel
              </Button>
              <Button  primary={true} onClick={createConversation} disabled={disabled}>
                Create
              </Button>
            </DialogActionsBar>
        </Dialog>
      )}
    </Fragment>
  );
};

export default NewMessage;
