import { React  } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import Conversation from "./Conversation"

const Content = () => {  

    return (
        <div>
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
        </div>

    )
}

export default withRouter(Content);