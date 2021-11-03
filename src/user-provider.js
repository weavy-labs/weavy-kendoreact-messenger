
import UserContext from './user-context';
import RealTimeContext from "./realtime-context";
import { useContext, useState, useEffect } from 'react';
import { API_URL } from './constants';
import { useQueryClient } from 'react-query';
import { useHistory } from "react-router-dom";

const UserProvider = (props) => {
    const [user, setUser] = useState(localStorage.getItem("usr"));
    const { connect } = useContext(RealTimeContext);
    const queryClient = useQueryClient();
    let history = useHistory();

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


    useEffect(() => {
        let username = localStorage.getItem("usr");
        if (username != null && users[username] != null) {
            login(username);
        }
    }, []);


    const login = (username) => {
        
        fetch(API_URL + "/client/sign-in", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + users[username],
            },
        })
            .then((res) => res.json())
            .then(() => {
                update(username);
            });
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("usr");
        queryClient.invalidateQueries(["user"]);
        history.push("/");        
    }

    const update = (username) => {
        setUser(username);
        localStorage.setItem("usr", username);
        queryClient.invalidateQueries(["user"]);
        connect();
        history.push("/");
    }

    return (
        <UserContext.Provider value={{
            user,
            login,
            logout
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;