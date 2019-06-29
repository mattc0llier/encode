import React from 'react';
import { Link } from 'react-router-dom';

class Start extends React.Component {
  constructor(){
    super();

    this.state = { courses: [], objectives: [], selectedCourse: {}, selectedObjective: {} }

    this.fetchCourses = this.fetchCourses.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
  }

  handleCourseChange(event){
    console.log(event.target.value);
    this.setState({
      selectedCourse: event.target.value
    })
  }

  fetchObjectives(){
    fetch(`/api/courses/${id}/objectives`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      console.log(body);
      this.setState({
        objectives: body
      })
    })
    .catch(error => console.log(error.message));
  }

  fetchCourses(){
    fetch(`/api/courses`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      console.log(body);
      this.setState({
        courses: body
      })
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount(){
    this.fetchCourses()
  }

  render(){
    return(
      <div className="start">

        <label for="course-select">Select your course:</label>

        <form>
          <select id="course-select" onChange={this.handleCourseChange}>
            <option value="">--Please choose an option--</option>
            {this.state.courses.map(course => (
              <React.Fragment key={course.id} >
                <option value={course.name} >{course.name}</option>
              </React.Fragment>
            ))}
          </select>
          <select id="objective-select">
            <option value="">--Please choose an option--</option>
            {this.state.objectives.map(objective => (
              <React.Fragment>
                <option value={objective.id}>{objective.name}</option>
                <input type="hidden" value={objective.id} />
              </React.Fragment>
            ))}
          </select>
          <Link to='/user/matt'><button type="submit" className="start__button">Let's go</button></Link>
        </form>
      </div>
    )
  }
}

export default Start;
