import React from 'react';
import { Link } from 'react-router-dom';

class Start extends React.Component {
  constructor(){
    super();

    this.state = { courses: [], objectives: [], selectedCourseId: 0, selectedObjectiveId: 0, redirect: false }

    this.fetchCourses = this.fetchCourses.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.fetchObjectives = this.fetchObjectives.bind(this);
    this.handleObjectiveChange = this.handleObjectiveChange.bind(this);
    this.handleUserStartPointSubmit = this.handleUserStartPointSubmit.bind(this);
    this.createUserActivities = this.createUserActivities.bind(this);
  }

  createUserActivities(){
    fetch(`/api/users/create`, {
      method: 'POST',
      body: JSON.stringify({
        currentUser: this.props.currentUser,
        course_id: this.state.selectedCourseId,
        objective_id: this.state.selectedObjectiveId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      console.log('newUser', body);
    })
  }

  handleUserStartPointSubmit(event){
    event.preventDefault();
    this.createUserActivities()
    this.setState({
      redirect: true
    })
    console.log(this.state.selectedCourseId, this.state.selectedObjectiveId);
  }

  handleObjectiveChange(event){
    console.log('event', event);
    console.log(event.target.value);
    this.setState({
      selectedObjectiveId: event.target.value
    })
  }

  fetchObjectives(id){
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

  handleCourseChange(event){
    console.log(event.target.value);
    this.setState({
      selectedCourseId: event.target.value,
      selectedObjectiveId: 0
    })
    this.fetchObjectives(event.target.value)
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
    if (this.state.redirect) return(<Redirect to={`/users/${this.props.currentUser.username}`} />)
     else return(
      <div className="start">

        <label for="course-select">Select your course:</label>

        <form onSubmit={this.handleUserStartPointSubmit}>
          <select id="course-select" onChange={this.handleCourseChange}>
            <option value="">--Please choose an option--</option>
            {this.state.courses.map(course => (
              <React.Fragment key={course.id} >
                <option value={course.id} >{course.name}</option>
              </React.Fragment>
            ))}
          </select>
          <select id="objective-select" onChange={this.handleObjectiveChange}>
            <option value="">--Please choose an option--</option>
            {this.state.objectives.map(objective => (
              <React.Fragment key={objective.objective_id}>
                <option value={objective.objective_id}>{objective.number} - {objective.objective}</option>
              </React.Fragment>
            ))}
          </select>
          <button type="submit" className="start__button">Let's go</button>
        </form>
      </div>
    )
  }
}

export default Start;
