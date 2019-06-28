import React from 'react';
import Scores from './Scores';
import Info from './Info';
import WorkingOn from './WorkingOn';
import History from './History';
import Activity from './Activity';
import '../../styles/components/Profile.scss';


class Profile extends React.Component {
  constructor() {
    super();
    this.state = { userProfile: [], userProfileObjectives: [], userProfileScores: {}, nextUserProfileObjective: {}, currentUserProfile: false };

    this.fetchUser = this.fetchUser.bind(this);
    this.fetchUserObjectives = this.fetchUserObjectives.bind(this);
    this.fetchUserScores = this.fetchUserScores.bind(this);
    this.receiveObjectiveStatus = this.receiveObjectiveStatus.bind(this);
    this.receiveNextUserObjective = this.receiveNextUserObjective.bind(this);
    this.updateuserProfileObjectives = this.updateuserProfileObjectives.bind(this);
    this.checkIfCurrentUserProfile = this.checkIfCurrentUserProfile.bind(this);
  }

  checkIfCurrentUserProfile(){
    console.log('checking current_user', this.state.userProfile.id, this.props.currentUser.user_id);
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

  receiveNextUserObjective(nextObjective){
    console.log('nextObjective', nextObjective);
  }

//take db complete response and update userProfileObjectives state
  updateuserProfileObjectives(activitiesResponse, completedObjective){


    function removeComplete(userObjective) {
      return userObjective.activity_id !== activitiesResponse.activity_id
    }

    const updatedUserObjectives = this.state.userProfileObjectives.filter(removeComplete)
    console.log('updatedUserObjectives', updatedUserObjectives);


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
    });
  }

// post objective complete to the database
  receiveObjectiveStatus(completedObjective){
    console.log('completedObjective', completedObjective);

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
        this.updateuserProfileObjectives(body, completedObjective)
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
      })
    })
    .catch(error => console.log(error.message));
  }

  fetchUserScores(id){
    fetch(`/api/users/${id}/scores`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        userProfileScores: body
      }, () => console.log(this.state.userProfileScores))

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
        { userProfile: body}
      )
      this.fetchUserObjectives(body.id)
      this.fetchUserScores(body.id)
      this.checkIfCurrentUserProfile();
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount() {
    const { match } = this.props;
    this.fetchUser(match.params.username);
  }

  render(){
    return(
      <div className="profile">
        <div className="left">
          <Info userProfileObject={this.state.userProfile}/>
          <Activity />
        </div>
        <div className="right">
          <Scores userProfileScoresObject={this.state.userProfileScores}/>
          <WorkingOn
            userProfileObjectivesObject={this.state.userProfileObjectives}
            receiveObjectiveStatus={this.receiveObjectiveStatus}
            receiveNextUserObjective={this.receiveNextUserObjective}
            currentUserProfile={this.state.currentUserProfile}
          />
          <History
            userProfileObject={this.state.userProfile}
            userProfileObjectivesObject={this.state.userProfileObjectives}
            receiveObjectiveStatus={this.receiveObjectiveStatus}
          />
        </div>
      </div>
    )
  }
}

export default Profile;
