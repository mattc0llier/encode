import React from 'react';
import { Link } from 'react-router-dom'

import '../../styles/components/Students.scss';


class Students extends React.Component {
  constructor(){
    super();

    this.state = { allUsers: [] }

    this.fetchAllStudents = this.fetchAllStudents.bind(this);
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
        <div className="student-filters">
          <h3>All students</h3>
          <h3>On the same question</h3>
          <h3>Completed the question</h3>
          <h3>Current Lambda School students</h3>
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
