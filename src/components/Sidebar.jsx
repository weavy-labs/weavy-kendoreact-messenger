import { React } from 'react';
import { NavLink } from "react-router-dom";
import { ListView } from '@progress/kendo-react-listview';
import { Avatar } from "@progress/kendo-react-layout";
import ConversationExcerpt from './ConversationExcerpt';
import { useQuery } from 'react-query';
import { API_URL } from '../constants';

const Sidebar = (props) => {

    const getConversations = async () => {

        const response = await fetch(API_URL + "/api/conversations", 
        {
            method: 'GET',
            credentials: 'include'
        });        
        const conversations = await response.json();
        return conversations;
    }

    const { isLoading, isError, data, error } = useQuery('conversations', getConversations,  { refetchOnWindowFocus: false })
  
    const MyItemRender = (props) => {
        let item = props.dataItem;

        return (
            <NavLink to={"/conversation/" + item.id} activeClassName="active">
            <div className="row p-2 border-bottom align-middle" style={{ margin: 0 }}>
                <div className="col-2">
                    <Avatar shape="circle" type="image">
                        <img
                            alt=""
                            src={API_URL + `/${item.avatar_url.replace('{options}', '48')}`}
                        />
                    </Avatar>
                </div>
                <div className="col-10">
                    <div className="text-truncate">{item.title}</div> 
                    <ConversationExcerpt id={item.id} excerpt={item.excerpt}></ConversationExcerpt>
                    
                </div>
            </div>
            </NavLink>
        );
    }

    if (isLoading) {
        return <span>Loading...</span>
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>
      }

    return (
        <div>
            <ListView
                data={data}
                item={MyItemRender}                
            />
        </div>
    )
}

export default Sidebar;