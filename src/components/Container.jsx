import { React } from 'react';
import { NavLink, useRouteMatch } from "react-router-dom";

import Sidebar from "./Sidebar";
import Content from "./Content";

const Container = (props) => {

    let match = useRouteMatch("/conversation/:id");

    return (
        <div id="root-container" className={"dual" + (match ? " two" : " one")}>
            <div className="pane" id="sidebar">
                <header className="pane-header">Telerik Messenger</header>
                <div className="pane-body">
                    <Sidebar></Sidebar>
                </div>
            </div>

            <main id="main" className="pane conversation">
                <header className="pane-header">                    
                    <NavLink to="/">Back</NavLink>                       
                    Conversation Header
                </header>
                <div className="pane-body">
                    <Content></Content>
                </div>
            </main>
        </div>
    )
}

export default Container;