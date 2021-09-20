import { React, useState, Fragment, useRef } from "react";
import { useQuery } from "react-query";
import { Skeleton } from "@progress/kendo-react-indicators";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { API_URL } from "../constants";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Checkbox } from "@progress/kendo-react-inputs";

const Settings = () => {
  const [visible, setVisible] = useState(false);
  const [timezone, setTimezone] = useState(null);
  const [avatarId, setAvatarId] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [enterToSend, setEnterToSend] = useState(false);
  const fileInput = useRef();

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const getSettings = async () => {
    const request = await fetch(`${API_URL}/api/conversations/settings`, {
      method: "GET",
      credentials: "include",
    });

    const settings = await request.json();
    setTimezone(settings.time_zone);
    setAvatarId(settings.avatar_id ?? "");
    setThumbnailUrl(settings.thumbnail_url);
    setEnterToSend(settings.enter_to_send);
    return settings;
  };

  const saveSettings = async (event) => {
    event.preventDefault();

    var values = { enter_to_send: enterToSend, time_zone: timezone ? timezone.value : null, avatar_id: avatarId === "" ? null : avatarId };

    await fetch(`${API_URL}/api/conversations/settings`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toggleDialog();
  };

  const { isLoading, data } = useQuery("settings", getSettings, { refetchOnWindowFocus: false });

  const onTimezoneChanged = (event) => {
    setTimezone(event.target.value);
  };

  const uploadFiles = async (data) => {
    return fetch(`${API_URL}/api/blobs`, {
      method: "POST",
      credentials: "include",
      body: data,
    });
  };

  const onFileSelected = async (event) => {
    var file = fileInput.current.files[0];

    if (file !== undefined && file.type.startsWith("image/")) {
      var data = new FormData();
      data.append("file", file);

      var response = await uploadFiles(data);

      if (response.ok) {
        var result = await response.json();
        setAvatarId(result.data[0].id);
        setThumbnailUrl(result.data[0].thumb.replace("{options}", "256"));
      } else {
        console.error("Failed to upload file.");
      }
    }
  };

  const clearAvatar = (event) => {
    event.preventDefault();
    event.cancelBubble = true;
    setThumbnailUrl("/people/0/avatar-256.svg");
    setAvatarId("");
  };

  return (
    <Fragment>
      <Button icon="cog" look="clear" onClick={toggleDialog}></Button>
      {visible && (
        <Dialog title="Settings" onClose={toggleDialog}>
          {isLoading && (
            <Fragment>
              <div className="d-flex justify-content-center" style={{width: "400px"}}>
                <Skeleton shape={"circle"} style={{ width: 256, height: 256 }} />
              </div>
              <Skeleton shape={"rectangle"} style={{ width: "20%", height: "20px" }} />
              <Skeleton shape={"text"} style={{ width: "100%", height: "60px" }} />
              <Skeleton shape={"text"} style={{ width: "40%", height: "40px" }} />
            </Fragment>
          )}
          {!isLoading && 
          <form onSubmit={saveSettings} className="settings">
            <div className="edit-avatar">
              <img alt="" src={`${API_URL}${thumbnailUrl}`} />
              <span href="#">Select avatar...</span>
              <input type="file" name="avatar" onChange={onFileSelected} ref={fileInput} accept=".gif, .jpg, .jpeg, .png, .svg" />
            </div>
            <a href="/#" className={avatarId === "" ? "d-block text-center invisible" : "d-block text-center"} onClick={clearAvatar}>
              Clear avatar
            </a>
            <div className="field">
              <DropDownList data={data.time_zones} value={timezone} textField="label" dataItemKey="value" label={"Timezone"} onChange={onTimezoneChanged} />
            </div>
            <div className="field py-3">
              <Checkbox value={enterToSend} onChange={(event) => setEnterToSend(event.value)} label="Enter to send" />
            </div>
            <div className="k-form-buttons">
              <Button type={"submit"} primary={true}>
                Save
              </Button>
              <Button onClick={toggleDialog} look="outline">
                Cancel
              </Button>
            </div>
          </form>
          }
        </Dialog>
      )}
    </Fragment>
  );
};
export default Settings;
