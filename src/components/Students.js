import React from 'react';
import Courses from './Courses';
import { Link } from 'react-router-dom'
import cx from 'classnames';

import '../../styles/components/Students.scss';


class Students extends React.Component {
  constructor(){
    super();

    this.state = { allUsers: [], filterView: "all" }

    this.fetchAllStudents = this.fetchAllStudents.bind(this);
    this.handleAllFilterClick = this.handleAllFilterClick.bind(this);
  }

  // handleFilterClick(event){
  //   console.log(event);
  //   this.setState({
  //     filterView: event.target.value
  //   })
  // }
  handleAllFilterClick(event){
    console.log(event.target.innerHTML);
    this.setState({
      filterView: event.target.innerHTML
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
    const active = this.state.filterView = '' ? '-active' : ''
    const classState = cx('title-active', active);
    return(
      <div className="students">
      <div className="table-center">
            <div className="table-nav">
              <h1>Students</h1>
              <div className="title-filters">
                <h4 onClick={this.handleAllFilterClick}>All students</h4>
                <h4 onClick={this.handleAllFilterClick}>Same objective</h4>
                <h4 onClick={this.handleAllFilterClick}>Completed objective</h4>
                <h4 onClick={this.handleAllFilterClick}>Current LS students</h4>
              </div>
            </div>
            <table>

              <tbody>
                {this.state.allUsers.map(student => (
                  <tr className="leader">
                    <Link to={`/users/${student.username}`}>
                    <td><img src={student.photo} alt="profile pic"/></td>
                    <td><h3>{student.first_name} {student.last_name}</h3></td>
                    <td><p>Web Precourse</p></td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    )
  }
}

export default Students;
