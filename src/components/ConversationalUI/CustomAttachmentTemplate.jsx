import { API_URL } from "../../constants";
import { mapIcon } from "../../utilities";
import PrettyBytes from 'react-pretty-bytes';

const DocumentAttachment = (props) => {

    return (
        <div className="k-card">
            <div className="k-card-body">
                <a
                    className="attachmentLink"
                    href={API_URL + props.item.download}
                    target="_blank"
                    draggable={false}
                    tabIndex={-1}
                    rel="noopener noreferrer"
                >
                    {mapIcon(props.item.icon.name, "large")}
                    <div className="attachmentMeta k-color-secondary">
                        {props.item.name}
                        <PrettyBytes bytes={props.item.size} />
                    </div>

                </a>
            </div>
        </div>

    )
}
const ImageAttachment = (props) => {

    return (
        <div className="k-card">
            <div className="k-card-body">
                <a
                    href={API_URL + props.item.download}
                    target="_blank"
                    draggable={false}
                    tabIndex={-1}
                    rel="noopener noreferrer"
                >
                    <img
                        alt=""
                        src={API_URL + "/attachments/" + props.item.id + "/image.png"}
                        draggable={false}
                    />
                </a>
            </div>
        </div>
    );
}

const CustomAttachmentTemplate = (props) => {
    return props.item.kind === "image" ? <ImageAttachment {...props} /> : <DocumentAttachment {...props} />;

};

export default CustomAttachmentTemplate;