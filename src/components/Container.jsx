import { React } from 'react';
import { NavLink, useRouteMatch } from "react-router-dom";

import Sidebar from "./Sidebar";
import Content from "./Content";

const Container = (props) => {

    let match = useRouteMatch("/conversation/:id");

    return (
        <div id="root-container" class={"dual" + (match ? " two" : " one")}>
            <div class="pane" id="sidebar">
                <header class="pane-header">Telerik Messenger</header>
                <div class="pane-body">
                    <Sidebar></Sidebar>
                </div>
            </div>

            <main id="main" class="pane conversation">
                <header class="pane-header">                    
                    <NavLink to="/">Back</NavLink>                       
                    Conversation Header
                </header>
                <div class="pane-body">
                    <Content></Content>
                </div>
            </main>
        </div>
    )
}

export default Container;