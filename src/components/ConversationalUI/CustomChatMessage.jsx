import { ChatMessage } from "@progress/kendo-react-conversational-ui";

const CustomChatMessage = (props) => (
    <ChatMessage {...props} dateFormat={"t"}  />
);

export default CustomChatMessage;