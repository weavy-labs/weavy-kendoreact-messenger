import { Button } from "@progress/kendo-react-buttons";
import { createRef, Fragment, useCallback, useEffect } from "react";
import { API_URL } from "../constants";

function useMessageBox(id, attachments, setAttachments) {

  const fileUpload = createRef();

  const uploadFiles = async (data) => {
    return fetch(API_URL + "/a/blobs/", {
      method: "POST",
      credentials: "include",
      body: data,
    });
  };

  const handleInputChange = async (e) => {
    var files = e.target.files;

    if (files.length > 0) {
      // add files to formdata object
      var formData = new FormData();
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        formData.append("file-" + index, file);
      }

      var response = await uploadFiles(formData);
      var json = await response.json();

      setAttachments([...attachments, ...json.data]);
    }
  };


  const CustomUploadButton = (props) => {
    return (
      <Fragment>
        <input
          type="file"
          onChange={handleInputChange}
          style={{
            display: "none",
          }}
          ref={fileUpload}
        />
        <button
          className={"k-button k-flat k-button-icon"}
          onClick={() => fileUpload.current.click()}
        >
          <span
            className={"k-icon " + props.icon}
            style={{
              fontSize: "20px",
            }}
          />
        </button>
      </Fragment>
    );
  };


  const CustomMessageBox = (props) => {

    const throttle = (func, limit) => {
      let inThrottle
      return function () {
        const args = arguments
        const context = this
        if (!inThrottle) {
          func.apply(context, args)
          inThrottle = true
          setTimeout(() => inThrottle = false, limit)
        }
      }
    }

    const handleKeyDown = throttle(async function () {
      await fetch(API_URL + "/api/conversations/" + id + "/typing", {
        method: "POST",
        credentials: "include",
      });
    }, 3000);

    useEffect(() => {
      document.querySelector('.k-message-box').addEventListener('keydown', handleKeyDown);

      return () => {
        if (document.querySelector('.k-message-box')) {
          document.querySelector('.k-message-box').removeEventListener('keydown', handleKeyDown);
        }
      }
    }, []);

    const handleRemoveItem = (attachmentId) => {
      setAttachments(attachments.filter(item => item.id !== attachmentId));
    }


    return (
      <Fragment>
        <div className="attachments">          
          {attachments.map((a) => {
            return (
              <div key={a.id} className="attachment">
                <img
                  alt=""
                  src={API_URL + `/${a.thumb.replace("{options}", "64")}`}
                />
                <span>{a.name}</span>
                <Button icon="delete" look="flat" onClick={handleRemoveItem.bind(this, a.id)}></Button>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flex: 1 }}>
          {CustomUploadButton({
            icon: "k-i-image-insert",
          })}
          {props.messageInput}
          {props.sendButton}
        </div>
      </Fragment>
    );
  };

  return CustomMessageBox;
}
export default useMessageBox;