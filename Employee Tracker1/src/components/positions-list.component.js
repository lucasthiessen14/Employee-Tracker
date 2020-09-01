//imports the required information
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//finds information to be put in the employee records table
const Position = props => (
  <tr>
    <td>{props.position.username}</td>
    <td>{props.position.job_description}</td>
    <td>{props.position.wage}</td>
    <td>{props.position.start_date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.position._id}>edit</Link> | <a href="#" onClick={() => { props.deletePosition(props.position._id)}}>delete</a>
    </td>
  </tr>
)

//creates a new PositionsList class
//class is an extension of component
export default class PositionsList extends Component {
  constructor(props) {
    super(props);

    //binds "this" to the required statments
    this.deletePosition = this.deletePosition.bind(this)

    this.state = {positions: []};
  }

  //retrieves positions from the database and adds them to positions array
  componentDidMount() {
    axios.get('http://localhost:5000/positions/')
      .then(response => {
        this.setState({ positions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //deletes information from positions in the databased when asked to
  deletePosition(id) {
    axios.delete('http://localhost:5000/positions/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      positions: this.state.positions.filter(el => el._id !== id)
    })
  }

  positionList() {
    return this.state.positions.map(currentposition => {
      return <Position position={currentposition} deletePosition={this.deletePosition} key={currentposition._id}/>;
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
              <th>Job Description</th>
              <th>Hourly Wage($)</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.positionList() }
          </tbody>
        </table>
      </div>
    )
  }
}