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
    this.state = { userProfile: [], userProfileObjectives: [], userProfileScores: {}, nextUserProfileObjective: {}, currentUserProfile: false, userProfileCourses: [], completedObjective: {} };

    this.fetchUser = this.fetchUser.bind(this);
    this.fetchUserObjectives = this.fetchUserObjectives.bind(this);
    this.receiveObjectiveStatus = this.receiveObjectiveStatus.bind(this);
    this.receiveNextUserObjective = this.receiveNextUserObjective.bind(this);
    this.updateuserProfileObjectives = this.updateuserProfileObjectives.bind(this);
    this.checkIfCurrentUserProfile = this.checkIfCurrentUserProfile.bind(this);
    this.calculateUserScores = this.calculateUserScores.bind(this);
    this.fetchUserCourses = this.fetchUserCourses.bind(this);
    this.receiveCompletedActivity = this.receiveCompletedActivity.bind(this);
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
// var add = async function(x) { // async function expression assigned to a variable
//   var a = await removeComplete();
//   var b = await updatedUserProfileObjectives();
//   return setState;
// };
  updateuserProfileObjectives(activitiesResponse, completedObjective){
    console.log('updateuserProfileObjectives completedActivity', activitiesResponse);
    console.log('updateuserProfileObjectives completedObjective', completedObjective);
    function removeComplete(userObjective) {
      return userObjective.activity_id !== activitiesResponse.activity_id
    }

    const updatedUserObjectives = this.state.userProfileObjectives.filter(removeComplete)
    console.log('updatedUserObjectives 1', updatedUserObjectives);
    console.log('this.state.userProfileObjectives 2', this.state.userProfileObjectives);

    const updatedUserProfileObjectives = updatedUserObjectives.concat({
      first_name: completedObjective.first_name,
      last_name: completedObjective.last_name,
      mastery_score: completedObjective.mastery_score,
      objective_id: completedObjective.objective_id,
      lesson_id: completedObjective.lesson_id,
      number: completedObjective.number,
      objective: completedObjective.objective,
      url: completedObjective.url,
      favicon: completedObjective.favicon,
      activity_id: completedObjective.activity_id,
      complete: activitiesResponse.complete,
      completion_time: activitiesResponse.completion_time
    })
    console.log('updatedUserObjectives 1', updatedUserObjectives);

    // // add the updated completed objective into the user objective state
    return this.setState({
      userProfileObjectives: updatedUserProfileObjectives
    }, () => {
          console.log('this.state.userProfileObjectives 3', this.state.userProfileObjectives);
          this.calculateUserScores()
    });
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
        this.setState({
          completedObjective: completedObjective
        })
      })
    .catch(error => console.log(error.message));
  }

  receiveCompletedActivity(completedActivity, completedObjective){
    console.log('receiveCompletedActivity completedActivity', completedActivity);
    console.log('receiveCompletedActivity completedObjective', completedObjective);
    this.updateuserProfileObjectives(completedActivity, completedObjective)
    this.props.receiveCurrentUserObjectiveUpdate(completedObjective)
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

    // need to get the completed objective data somehow to make this work
    const context = pusher.subscribe('activityUpdate');
    context.bind('activityComplete', (activityUpdateData) => {
      console.log("recieved activityUpdate event", activityUpdateData.message);
      console.log("recieved activityUpdate event", activityUpdateData.message[0]);
      console.log("recieved activityUpdate event", activityUpdateData.message[1]);
      const completedActivity = activityUpdateData.message[0]
      const completedObjective = activityUpdateData.message[1][0]
      this.receiveCompletedActivity(completedActivity, completedObjective)
    })
  }

  render(){
    return(
      <div className="profile">
        <div className="left">
          <Info userProfileObject={this.state.userProfile} userProfileCourses={this.state.userProfileCourses}/>
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
            currentUserProfile={this.state.currentUserProfile}
          />
        </div>
      </div>
    )
  }
}

export default Profile;
