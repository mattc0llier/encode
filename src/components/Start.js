import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../styles/components/Start.scss';


class Start extends React.Component {
  constructor(){
    super();

    this.state = { courses: [], objectives: [], selectedCourseId: 0, selectedObjectiveNumber: 0, redirect: false }

    this.fetchCourses = this.fetchCourses.bind(this);
    this.handleCourseClick = this.handleCourseClick.bind(this);
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

  handleCourseClick(event){
    console.log('event', event);
    console.log('event.target', event.target);
    console.log('event.currentTarget', event.currentTarget);
    console.log('event.target.innerHTML', event.target.innerHTML);
    console.log('event.target.value', event.target.value);
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
            <div id="course-select" >
              {this.state.courses.map(course => (
                <div key={course.id} className="course-summary">
                  <img src={course.badge} onClick={this.handleCourseClick} value={course.id} className="course-badge"/>
                  <div onClick={this.handleCourseClick} value={course.id} >{course.name}</div>
                </div>
              ))}
            </div>
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
