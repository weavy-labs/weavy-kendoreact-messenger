import { React, useContext } from "react";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import UserContext from "../user-context";
import SignIn from "./SignIn";
import Sidebar from "./Sidebar";
import Content from "./Content";
import NewMessage from "./NewMessage";
import Settings from "./Settings";
import { API_URL } from "../constants";
import { useQuery } from "react-query";

const Container = () => {

  const { user } = useContext(UserContext);

  let isSigningIn = useRouteMatch("/sign-in");
  let match = useRouteMatch("/conversation/:id");

  const getUser = async () => {
    try {
      const response = await fetch(API_URL + "/api/users/me", {
        method: "GET",
        credentials: "include",
      });

      const me = await response.json();
      return me;
    } catch (error) {
      return null;
    }
  };

  const { isLoading, isError, data, error } = useQuery(["user"], getUser, { refetchOnWindowFocus: false });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  
  if (!user && !isSigningIn) {
    return <Redirect to="/sign-in" />;
  }
  return (
    <Switch>
      <Route path="/sign-in" exact>
        <div id="root-container">
          <SignIn></SignIn>
        </div>
      </Route>
      <Route>
        <div id="root-container" className={"dual" + (match ? " two" : " one")}>
          <div className="pane" id="sidebar">
            <header className="pane-header">
              <NewMessage></NewMessage>
              <div className="pane-title text-truncate">Weavy Telerik Messenger</div>
              <Settings></Settings>
            </header>
            <div className="pane-body">
              <Sidebar></Sidebar>
            </div>
          </div>
           {data && 
           <main id="main" className="pane conversation">
             <Content user={{ id: data.id, avatarUrl: API_URL + `${data.thumb.replace("{options}", "128")}`, name: data.profile.name }}></Content>
           </main>
           } 
        </div>
      </Route>
    </Switch>
  )
};

export default Container;
