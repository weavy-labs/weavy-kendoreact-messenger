import { API_URL } from "../../constants";

const CustomAttachmentTemplate = (props) => {
        
    return (
        <a
            href={API_URL + props.item.url}
            target="_blank"
            draggable={false}
            tabIndex={-1}
            rel="noopener noreferrer"
        >
            <img
                alt=""
                style={{
                    width: 250,
                }}
                src={API_URL + "/attachments/" + props.item.id + "/image.png"}
                draggable={false}
            />
        </a>
    );
    //  return (
    //     <div className="k-card">
    //         <div className="k-card-body">
    //         <img alt="" src={"https://showcase.weavycloud.com/attachments/" + attachment + "/image.png"} draggable={false} rel="noopener noreferrer"/>;
    //         </div>
    //     </div>
    // );

    // if (attachment.contentType === "link") {
    //     return (
    //         <div className="k-card">
    //             <div className="k-card-body">
    //                 <a
    //                     href={attachment.site}
    //                     target="_blank"
    //                     draggable={false}
    //                     tabIndex={-1}
    //                     rel="noopener noreferrer"
    //                 >
    //                     {attachment.content}
    //                 </a>
    //             </div>
    //         </div>
    //     );
    // } else if (attachment.contentType.match("^image")) {
    //     return <img alt="" src={attachment.content} draggable={false} />;
    // } else if (attachment.contentType === "text/plain") {
    //     return attachment.content;
    // } else {
    //     return null;
    // }
};

export default CustomAttachmentTemplate;