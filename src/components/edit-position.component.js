//imports the required information
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//creates a new class called EditPositions
//the new class in an extension of Component
export default class EditPosition extends Component {
  constructor(props) {
    super(props);

    //binds "this" to the following statments
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeJob_Description = this.onChangeJob_Description.bind(this);
    this.onChangeWage = this.onChangeWage.bind(this);
    this.onChangeStart_Date = this.onChangeStart_Date.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      job_description: '',
      wage: 0,
      start_date: new Date(),
      users: []
    }
  }

  //find the information in the database
  componentDidMount() {
    axios.get('http://localhost:5000/positions/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          job_description: response.data.job_description,
          wage: response.data.wage,
          start_date: new Date(response.data.start_date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
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

  //sends new information to the database
  onSubmit(e) {
    e.preventDefault();

    //the new information that is to be sent
    const position = {
      username: this.state.username,
      job_description: this.state.job_description,
      wage: this.state.wage,
      start_date: this.state.start_date
    }
    //prints position
    console.log(position);

    //the location the information is to be sent to and what it is going to do
    axios.post('http://localhost:5000/positions/update/' + this.props.match.params.id, position)
      .then(res => console.log(res.data));

    //reload page so changes can be viewed
    window.location = '/';
  }

  //creates the screan the users sees and interacts with
  render() {
    return (
    <div>
      <h3>Edit Employee Position</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Employee: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
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
          <label>Stare Date: </label>
          <div>
            <DatePicker
              selected={this.state.start_date}
              onChange={this.onChangeStart_Date}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Employee List" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}