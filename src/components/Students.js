import React from 'react';

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
        {this.state.allUsers.map(student => (
          <h3 key={student.id}>{student.first_name} {student.last_name}</h3>
        ))}


      </div>
    )
  }
}

export default Students;
