import { React, useContext, useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import UserContext from "../user-context";

const SignIn = () => {
  const selectUserMessage = "Sign in by selecting a user from the list.";

  const [value, setValue] = useState(null);
  const { login } = useContext(UserContext);

  const users = [
    { text: "Oliver Winter", id: "oliver" },
    { text: "Lilly Diaz", id: "lilly" },
    { text: "Samara Kaur", id: "samara" },
    { text: "Adam Mercer", id: "adam" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    login(value.id)
    
    //window.location.href = "/";
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div className="text-center">
        <h1>Welcome to Weavy Telerik Messenger!</h1>
        <p style={{ marginTop: "2rem" }}>To get you up and running in a jiff - sign in using the...</p>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col col-lg-4">
              <form className="k-form" onSubmit={handleSubmit}>
                <fieldset>
                  <div className="mb-3">
                    <DropDownList onChange={handleChange} value={value} label="Sign in with a user..." name="user" data={users} required={true} validationMessage={selectUserMessage} textField="text" dataItemKey="id" />
                  </div>
                </fieldset>
                <input type="submit" className="k-button k-primary" value="Sign in" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
