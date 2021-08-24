import { React } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import Conversation from "./Conversation"

const Content = () => {

    return (

        <Switch>
            <Route path="/" exact>
                <Conversation></Conversation>
            </Route>

            <Route path="/conversation/:id" exact>
                <Conversation></Conversation>
            </Route>

            <Route path="/about">
                <div>About!</div>
            </Route>
        </Switch>
    )
}

export default withRouter(Content);