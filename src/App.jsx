import '@progress/kendo-theme-bootstrap/dist/all.css';
import './App.css';

import { BrowserRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

const App = (props) => {

 


  return (
    <BrowserRouter>
      <div className="app">
        
        <Sidebar></Sidebar>
        <Content></Content>
        {/* <NavLink to="/" activeClassName="selected">
          Home
        </NavLink>
        <NavLink to="/about" activeClassName="selected">
          About
        </NavLink> */}

       


      </div>
    </BrowserRouter>
  );
}

export default App;
