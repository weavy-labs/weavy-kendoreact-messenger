import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

import { BrowserRouter } from "react-router-dom";

import Sidebar from "./components/Sidebar"


const App = (props) => {

 


  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar>

        </Sidebar>
      
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
