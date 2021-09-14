import { createRef, Fragment } from "react";
import { API_URL } from "../constants";

function useMessageBox(attachments, setAttachments) {

    const fileUpload = createRef();

    const uploadFiles = async (data) => {
        return fetch(`${API_URL}/api/blobs`, {
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
        return (
            <Fragment>
                <div>
                    Attachments:
                    {attachments.map((a) => {
                        return (
                            <div key={a.id}>
                                <img
                                    alt=""
                                    src={API_URL + `/${a.thumb.replace("{options}", "16")}`}
                                />
                                {a.name}
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