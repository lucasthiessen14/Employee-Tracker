//imports the required information
import React, { Component } from 'react';
import axios from 'axios';

//finds information to be put in the employee table
const User = props => (
  <tr>
    <td>{props.user.username}</td>
    <td>{props.user.address}</td>
    <td>{props.user.sin_number}</td>
    <td>
      <a href="#" onClick={() => { props.deleteUser(props.user._id)}}>delete</a>
    </td>
  </tr>
)

//creates a new EmployeeList class
//class is an extension of component
export default class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this)

    this.state = {user: []};
  }

  //adds the user information from the database to our user array
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ user: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  

  //deletes information from users in the databased when asked to
  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      user: this.state.user.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.user.map(currentuser => {
      return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  //creates the screen the users see and interact with
  render() {
    return (
      <div>
        <h3>Employee List</h3>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Address</th>
              <th>Sin Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}