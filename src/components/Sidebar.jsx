import { React } from 'react';
import { NavLink } from "react-router-dom";
import { ListView } from '@progress/kendo-react-listview';
import { Avatar } from "@progress/kendo-react-layout";
import { useQuery } from 'react-query';

const Sidebar = (props) => {

    const getConversations = async () => {

        const response = await fetch("https://showcase.weavycloud.com/api/conversations", 
        {
            method: 'GET',
            credentials: 'include'
        });
        
        const conversations = await response.json();

        return conversations;

    }

    const { isLoading, isError, data, error } = useQuery('conversations', getConversations)
  
    const MyItemRender = (props) => {
        let item = props.dataItem;

        return (
            <div className="row p-2 border-bottom align-middle" style={{ margin: 0 }}>
                <div className="col-2">
                    <Avatar shape="circle" type="image">
                        <img
                            alt=""
                            src={`https://showcase.weavycloud.com/${item.thumb.replace('{options}', '32')}`}
                        />
                    </Avatar>
                </div>
                <div className="col-10">
                    <NavLink to={"/conversation/" + item.id} activeClassName="selected">{item.name || 'conversation'}</NavLink>
                </div>
            </div>
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