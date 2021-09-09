import { useQuery } from "react-query";
import { API_URL } from "../constants";

function useMessages(id) {

    
  const mapMessage = (item) => {

    return {
      text: item.text,
      timestamp: new Date(item.created_at),
      author: {
        id: item.created_by_id,
        name: item.created_by_name,
        avatarUrl:
          API_URL + `${item.created_by_thumb.replace("{options}", "32")}`,
      },
      attachments: item.attachments,
      seenBy: item.seen_by
      // attachments: item.attachments.map((a) => {
      //     return {
      //         content: "https://showcase.weavycloud.com/attachments/" + a + "/image.png",
      //         contentType: "image",
      //     }
      // })
    };
  }


    const getMessages = async () => {
        const response = await fetch(
          API_URL + "/api/conversations/" + id + "/messages",
          {
            method: "GET",
            credentials: "include",
          }
        );
    
        const messages = await response.json();
    
        return messages.data?.map((item) => {
          return mapMessage(item);
        });
      };

   return useQuery(["messages", id], getMessages, { refetchOnWindowFocus: false });
}

export default useMessages;