import { React, useEffect, useContext } from 'react';
import { useRouteMatch } from "react-router-dom";
import { useQuery } from "react-query";
import RealTimeContext from "../realtime-context";
import Sidebar from "./Sidebar";
import Content from "./Content";
import NewMessage from "./NewMessage"
import Settings from "./Settings"
import { API_URL } from '../constants';

const Container = (props) => {

    let match = useRouteMatch("/conversation/:id");

    const { connect } = useContext(RealTimeContext);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbGl2ZXIiLCJuYW1lIjoiT2xpdmVyIFdpbnRlciIsImV4cCI6MjUxNjIzOTAyMiwiaXNzIjoic3RhdGljLWZvci1kZW1vIiwiY2xpZW50X2lkIjoiV2VhdnlEZW1vIiwiZGlyIjoiY2hhdC1kZW1vLWRpciIsImVtYWlsIjoib2xpdmVyLndpbnRlckBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoib2xpdmVyIn0.VuF_YzdhzSr5-tordh0QZbLmkrkL6GYkWfMtUqdQ9FM";

    const getUser = async () => {
        const response = await fetch(
            API_URL + "/api/users/me",
            {
              method: "GET",
              credentials: "include",
            }
          );
      
          const me = await response.json();
          return me;
    }

    useEffect(() => {
        fetch(API_URL + '/client/sign-in', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        }).then(res => res.json())
            .then((user) => {                
                connect();
            });
    }, []);

    const { isLoading, isError, data, error } = useQuery(["user"], getUser, { refetchOnWindowFocus: false });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <div id="root-container" className={"dual" + (match ? " two" : " one")}>
            <div className="pane" id="sidebar">
                <header className="pane-header">
                    <NewMessage></NewMessage>
                    <div className="pane-title text-truncate">
                        Telerik Messenger
                    </div>
                    <Settings></Settings>
                </header>
                <div className="pane-body">
                    <Sidebar></Sidebar>
                </div>
            </div>

            <main id="main" className="pane conversation">
                <Content user={ {id: data.id, avatarUrl: API_URL + `${data.thumb.replace("{options}", "32")}`, name: data.profile.name}}></Content>
            </main>
        </div>
    )
}

export default Container;