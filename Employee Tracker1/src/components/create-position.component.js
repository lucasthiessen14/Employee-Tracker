//imports all the reguired data 
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//creates a CreatePosition class 
//created as an extenting of Component
export default class CreatePosition extends Component {
  constructor(props) {
    super(props);

    //binds "this" to each statment
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeJob_Description = this.onChangeJob_Description.bind(this);
    this.onChangeWage = this.onChangeWage.bind(this);
    this.onChangeStart_Date = this.onChangeStart_Date.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //sets the default value
    this.state = {
      username: '',
      job_description: '',
      wage: 0,
      start_date: new Date(),
      users: []
    }
  }

  //gets the users that are already created and saved to the database
  //adds the users to a user array
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  //sets username
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  //sets job description
  onChangeJob_Description(e) {
    this.setState({
      job_description: e.target.value
    })
  }
  //sets wage
  onChangeWage(e) {
    this.setState({
      wage: e.target.value
    })
  }
  //sets start date
  onChangeStart_Date(date) {
    this.setState({
      start_date: date
    })
  }

  //submits the new information to the database
  onSubmit(e) {
    e.preventDefault();

    const position = {
      username: this.state.username,
      job_description: this.state.job_description,
      wage: this.state.wage,
      start_date: this.state.start_date
    }
    //prints the position variable
    console.log(position);

    //adds the new information to the appropriate place in the database
    axios.post('http://localhost:5000/positions/add', position)
      .then(res => console.log(res.data));

    //brings the user to the positions-list page to see what was added
    window.location = '/';
  }

  //creates what the user will see and interact with on the create positions screen
  render() {
    return (
    <div>
      <h3>Create Position</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Employee Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.usernamee}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Job Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.job_description}
              onChange={this.onChangeJob_Description}
              />
        </div>
        <div className="form-group">
          <label>Hourly Wage (in dollars): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.wage}
              onChange={this.onChangeWage}
              />
        </div>
        <div className="form-group">
          <label>Start Date: </label>
          <div>
            <DatePicker
              selected={this.state.start_date}
              onChange={this.onChangeStart_Date}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Position Log" className="btn btn-info" />
        </div>
      </form>
    </div>
    )
  }
}