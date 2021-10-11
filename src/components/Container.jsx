import { React, useEffect, useContext } from "react";
import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import RealTimeContext from "../realtime-context";
import Sidebar from "./Sidebar";
import Content from "./Content";
import NewMessage from "./NewMessage";
import Settings from "./Settings";
import { API_URL } from "../constants";
import SignIn from "./SignIn";

const Container = (props) => {
  let match = useRouteMatch("/conversation/:id");
  let isSigningIn = useRouteMatch("/sign-in");
  const queryClient = useQueryClient();

  // NOTE: hard coded, long lived, JWT Tokens that can be used for demo purposes. Authenticates users against showcase.weavycloud.com
  var users = [];
  users["oliver"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbGl2ZXIiLCJuYW1lIjoiT2xpdmVyIFdpbnRlciIsImV4cCI6MjUxNjIzOTAyMiwiaXNzIjoic3RhdGljLWZvci1kZW1vIiwiY2xpZW50X2lkIjoiV2VhdnlEZW1vIiwiZGlyIjoiY2hhdC1kZW1vLWRpciIsImVtYWlsIjoib2xpdmVyLndpbnRlckBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoib2xpdmVyIn0.VuF_YzdhzSr5-tordh0QZbLmkrkL6GYkWfMtUqdQ9FM";
  users["lilly"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsaWxseSIsIm5hbWUiOiJMaWxseSBEaWF6IiwiZXhwIjoyNTE2MjM5MDIyLCJpc3MiOiJzdGF0aWMtZm9yLWRlbW8iLCJjbGllbnRfaWQiOiJXZWF2eURlbW8iLCJkaXIiOiJjaGF0LWRlbW8tZGlyIiwiZW1haWwiOiJsaWxseS5kaWF6QGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJsaWxseSJ9.rQvgplTyCAfJYYYPKxVgPX0JTswls9GZppUwYMxRMY0";
  users["samara"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYW1hcmEiLCJuYW1lIjoiU2FtYXJhIEthdXIiLCJleHAiOjI1MTYyMzkwMjIsImlzcyI6InN0YXRpYy1mb3ItZGVtbyIsImNsaWVudF9pZCI6IldlYXZ5RGVtbyIsImRpciI6ImNoYXQtZGVtby1kaXIiLCJlbWFpbCI6InNhbWFyYS5rYXVyQGV4YW1wbGUuY29tIiwidXNlcm5hbWUiOiJzYW1hcmEifQ.UKLmVTsyN779VY9JLTLvpVDLc32Coem_0evAkzG47kM";
  users["adam"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZGFtIiwibmFtZSI6IkFkYW0gTWVyY2VyIiwiZXhwIjoyNTE2MjM5MDIyLCJpc3MiOiJzdGF0aWMtZm9yLWRlbW8iLCJjbGllbnRfaWQiOiJXZWF2eURlbW8iLCJkaXIiOiJjaGF0LWRlbW8tZGlyIiwiZW1haWwiOiJhZGFtLm1lcmNlckBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoiYWRhbSJ9.c4P-jeQko3F_-N4Ou0JQQREePQ602tNDhO1wYKBhjX8";

  const { connect } = useContext(RealTimeContext);

  var user = localStorage.getItem("usr");
  let token = null;

  if (user != null && users[user] != null) {
    token = users[user];
  }

  const getUser = async () => {
    const response = await fetch(API_URL + "/api/users/me", {
      method: "GET",
      credentials: "include",
    });

    const me = await response.json();
    return me;
  };

  useEffect(() => {
    if (token != null) {
      fetch(API_URL + "/client/sign-in", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((user) => {
          queryClient.invalidateQueries(["user"]);
          connect();
        });
    }
  }, [token, queryClient]);

  const { isLoading, isError, data, error } = useQuery(["user"], getUser, { refetchOnWindowFocus: false });

  if (token == null && !isSigningIn) {
    return <Redirect to="/sign-in" />;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
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

          <main id="main" className="pane conversation">
            <Content user={{ id: data.id, avatarUrl: API_URL + `${data.thumb.replace("{options}", "128")}`, name: data.profile.name }}></Content>
          </main>
        </div>
      </Route>
    </Switch>
  );
};

export default Container;
