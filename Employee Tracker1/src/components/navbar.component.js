//imports the required information
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//creates a new class names Navbar
//class in an extension of Component
export default class Navbar extends Component {

  //creates the screan the user sees and interacts with
  render() {
    return (
      <nav className="navbar navbar-dark bg-info navbar-expand-lg">
        <Link to="/" className="navbar-brand">Employee Records</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Employee List</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Position</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create Employee</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}