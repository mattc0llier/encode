import React from 'react';
import { Link } from 'react-router-dom'

import '../../styles/components/Students.scss';


class Students extends React.Component {
  constructor(){
    super();

    this.state = { allUsers: [], filterView: "all" }

    this.fetchAllStudents = this.fetchAllStudents.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  handleFilterClick(event){
    this.setState({
      filterView: event.target.value
    })
  }

  fetchAllStudents(){
    fetch(`/api/users`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState(
        { allUsers: body}
      )
      console.log(this.state.allUsers);
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount(){
    this.fetchAllStudents()
  }

  render(){
    return(
      <div className="students">
        <h1>Students</h1>
        <div className="title-filters">
          <h4 value="all" onClick={this.handleFilterClick}>All students</h4>
          <h4 value="same" onClick={this.handleFilterClick}>On the same question</h4>
          <h4 value="further" onClick={this.handleFilterClick}>Completed the question</h4>
          <h4 value="full-students" onClick={this.handleFilterClick}>Current Lambda School students</h4>
        </div>
        {this.state.allUsers.map(student => (

            <Link to={`/users/${student.username}`}>
            <div className="student" key={student.id}>
              <img src={student.photo} alt={student.username} />
              <h3>{student.first_name} {student.last_name}</h3>
            </div>
            </Link>

        ))}


      </div>
    )
  }
}

export default Students;
