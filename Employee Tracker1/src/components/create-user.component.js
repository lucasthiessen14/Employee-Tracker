//imports the required data
import React, { Component } from 'react';
import axios from 'axios';

//creates new CreateUser class
//sets the new call as an extension of Component
export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    //binds "this" to the following statments
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeSin_Number = this.onChangeSin_Number.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //sets the default value for username
    this.state = {
      username: '',
      address: '',
      sin_number: 0,
    }
  }
  //sets username
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  onChangeSin_Number(e) {
    this.setState({
      sin_number: e.target.value
    })
  }

  //submits the new information to the database
  onSubmit(e) {
    e.preventDefault();

    //sets the information to be sent
    const user = {
      username: this.state.username,
      address: this.state.address,
      sin_number: this.state.sin_number
    }

    //prints user
    console.log(user);

    //sets the location in the database for the information to be saved
    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    //reloads the screen so user can see the new updated employee list
    window.location = '/user';

    this.setState({
      username: ''
    })

  }

  //creates the screen the user will veiw and interact with
  render() {
    return (
      <div>
        <h3>Create New Employee</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Employee Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
          <label>Address: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
              />
        </div>
        <div className="form-group"> 
          <label>Sin Number(no spaces): </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.sin_number}
              onChange={this.onChangeSin_Number}
              />
        </div>
          <div className="form-group">
            <input type="submit" value="Create Employee" className="btn btn-info" />
          </div>
        </form>
      </div>
    )
  }
}