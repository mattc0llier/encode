import React from 'react';
import Scores from './Scores';
import Info from './Info';
import WorkingOn from './WorkingOn';
import History from './History';
import Activity from './Activity';
import { Link } from 'react-router-dom';
import Pusher from 'pusher-js';
import '../../styles/components/Profile.scss';


class Profile extends React.Component {
  constructor() {
    super();
    this.state = { userProfile: [], userProfileObjectives: [], userProfileScores: {}, nextUserProfileObjective: {}, currentUserProfile: false, userProfileCourses: [] };

    this.fetchUser = this.fetchUser.bind(this);
    this.fetchUserObjectives = this.fetchUserObjectives.bind(this);
    this.receiveObjectiveStatus = this.receiveObjectiveStatus.bind(this);
    this.receiveNextUserObjective = this.receiveNextUserObjective.bind(this);
    this.updateuserProfileObjectives = this.updateuserProfileObjectives.bind(this);
    this.checkIfCurrentUserProfile = this.checkIfCurrentUserProfile.bind(this);
    this.calculateUserScores = this.calculateUserScores.bind(this);
    this.fetchUserCourses = this.fetchUserCourses.bind(this);
  }

  checkIfCurrentUserProfile(){
    this.state.userProfile.id === this.props.currentUser.user_id ? (
      this.setState({
        currentUserProfile: true
      })
    ) : (
      this.setState({
        currentUserProfile: false
      })
    )
  }

  calculateUserScores(){
    const timeNow = Date.now()

    fetch(`/api/users/${this.state.userProfile.id}/objectives/complete/${timeNow}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        userProfileScores: body
      })

    })
    .catch(error => console.log(error.message));
  }


  receiveNextUserObjective(nextObjective){
    console.log('nextObjective', nextObjective);
  }

//take db complete response and update userProfileObjectives state
  updateuserProfileObjectives(activitiesResponse, completedObjective){


    function removeComplete(userObjective) {
      return userObjective.activity_id !== activitiesResponse.activity_id
    }

    const updatedUserObjectives = this.state.userProfileObjectives.filter(removeComplete)


    // // add the updated completed objective into the user objective state
    this.setState({
      userProfileObjectives: updatedUserObjectives.concat({
        objective_id: completedObjective.objective_id,
        lesson_id: completedObjective.lesson_id,
        number: completedObjective.number,
        objective: completedObjective.objective,
        url: completedObjective.url,
        activity_id: completedObjective.activity_id,
        complete: activitiesResponse.complete,
        completion_time: activitiesResponse.completion_time
      })
    }, () => this.calculateUserScores());
  }

// post objective complete to the database
  receiveObjectiveStatus(completedObjective){
    return fetch(`/api/activities/${completedObjective.activity_id}`, {
      method: 'PATCH',
      body: JSON.stringify({ complete: true }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      console.log('body', body);
      console.log('completedObjective', completedObjective);
        this.updateuserProfileObjectives(body, completedObjective)
        this.props.receiveCurrentUserObjectiveUpdate(completedObjective)
    })
    .catch(error => console.log(error.message));
  }

  fetchUserCourses(id){
    fetch(`/api/users/${id}/courses`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        userProfileCourses: body
      })
    })
    .catch(error => console.log(error.message));
  }

  fetchUserObjectives(id){
    fetch(`/api/users/${id}/objectives`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        userProfileObjectives: body
      }, () => this.calculateUserScores())
    })
    .catch(error => console.log(error.message));
  }

  fetchUser(username){
    fetch(`/api/users/${username}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState(
        { userProfile: body
        })
      this.fetchUserObjectives(body.id)
      this.checkIfCurrentUserProfile();
      this.fetchUserCourses(body.id)

    })
    .catch(error => console.log(error.message));
  }

  componentDidMount() {
    const { match } = this.props;
    this.fetchUser(match.params.username);
    Pusher.logToConsole = true;

    var pusher = new Pusher('afc88b08b01a286ce8f6', {
      cluster: 'us3',
      forceTLS: true
    });

    const context = pusher.subscribe('activityUpdate');
    context.bind('activityComplete', (data) => {
      console.log("recieved activityUpdate event", data.message);
      this.receiveCurrentUserObjectiveUpdate(data.message)
    });
  }

  render(){
    return(
      <div className="profile">
        <div className="left">
          <Info userProfileObject={this.state.userProfile} userProfileCourses={this.state.userProfileCourses}/>
          { this.state.currentUserProfile ? <Link to='/settings'><p>**Update your profile**</p></Link> : null}
        </div>
        <div className="right">
          <Scores userProfileScoresObject={this.state.userProfileScores}/>
          <Activity userProfileObjectivesObject={this.state.userProfileObjectives}/>
          <WorkingOn
            userProfileObjectivesObject={this.state.userProfileObjectives}
            receiveObjectiveStatus={this.receiveObjectiveStatus}
            receiveNextUserObjective={this.receiveNextUserObjective}
            currentUserProfile={this.state.currentUserProfile}
          />
          <History
            userProfileObjectivesObject={this.state.userProfileObjectives}
            receiveObjectiveStatus={this.receiveObjectiveStatus}
          />
        </div>
      </div>
    )
  }
}

export default Profile;
