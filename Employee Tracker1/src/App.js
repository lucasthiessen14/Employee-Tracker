//imports all the required data
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import PositionsList from "./components/positions-list.component";
import EditPosition from "./components/edit-position.component";
import CreatePosition from "./components/create-position.component";
import CreateUser from "./components/create-user.component";
import EmployeeList from "./components/employee-list.component";

//combines all the sections together to run the web app
function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={PositionsList} />
      <Route path="/edit/:id" component={EditPosition} />
      <Route path="/create" component={CreatePosition} />
      <Route path="/user" component={CreateUser} />
      <Route path="/user" component={EmployeeList} />
      </div>
    </Router>
  );
}

export default App;