import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Start extends React.Component {
  constructor(){
    super();

    this.state = { courses: [], objectives: [], selectedCourseId: 0, selectedObjectiveNumber: 0, redirect: false }

    this.fetchCourses = this.fetchCourses.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.fetchObjectives = this.fetchObjectives.bind(this);
    this.handleObjectiveChange = this.handleObjectiveChange.bind(this);
    this.handleUserStartPointSubmit = this.handleUserStartPointSubmit.bind(this);
    this.createUserActivities = this.createUserActivities.bind(this);
  }

  createUserActivities(){
    console.log('createUserActivities');
    fetch(`/api/users/activities/create`, {
      method: 'POST',
      body: JSON.stringify({
        currentUser: this.props.currentUser,
        course: {
          id: this.state.selectedCourseId
        },
        objective: {
          number: this.state.selectedObjectiveNumber
        }
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
    console.log(this.state.selectedCourseId, this.state.selectedObjectiveNumber);
  }

  handleObjectiveChange(event){
    console.log('event', event);
    console.log(event.target.value);
    this.setState({
      selectedObjectiveNumber: event.target.value
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
      selectedObjectiveNumber: 0
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
      <div className="form-center">
        <div className="start">

        <h2>Select your course</h2>

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
                  <option value={objective.number}>{objective.number} - {objective.objective}</option>
                </React.Fragment>
              ))}
            </select>
            <button type="submit" className="start__button">Let's go</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Start;
