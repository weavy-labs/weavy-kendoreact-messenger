import { API_URL } from "../../constants";

const CustomMessageTemplate = (props) => {
    return (
      <div>
        <div className="k-bubble">
          <div>{props.item.text}</div>
        </div>
        {props.item.seenBy && props.item.seenBy.map(m => {
          return <img alt="" key={m.id} style={{ borderRadius: '50%' }} src={API_URL + `${m.thumb.replace("{options}", "16")}`} title={"Seen by " + m.name + " " + new Date(m.read_at).toLocaleString()} />
        })}
      </div>

    );
  };

  export default CustomMessageTemplate;