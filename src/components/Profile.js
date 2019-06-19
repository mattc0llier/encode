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
    this.state = { currentUser: [], currentUserObjectives: [], nextUserObjective: {} };

    this.fetchUser = this.fetchUser.bind(this);
    this.fetchUserObjectives = this.fetchUserObjectives.bind(this);
    this.receiveObjectiveStatus = this.receiveObjectiveStatus.bind(this);
    this.receiveNextUserObjective = this.receiveNextUserObjective.bind(this);
    this.updateCurrentUserObjectives = this.updateCurrentUserObjectives.bind(this);
  }

  receiveNextUserObjective(nextObjective){
    console.log('nextObjective', nextObjective);
  }

//take db complete response and update currentUserObjectives state
  updateCurrentUserObjectives(activitiesResponse, completedObjective){


    function removeComplete(userObjective) {
      return userObjective.activity_id !== activitiesResponse.activity_id
    }

    const updatedUserObjectives = this.state.currentUserObjectives.filter(removeComplete)
    console.log('updatedUserObjectives', updatedUserObjectives);


    // // add the updated completed objective into the user objective state
    this.setState({
      currentUserObjectives: updatedUserObjectives.concat({
        objective_id: completedObjective.objective_id,
        lesson_id: completedObjective.lesson_id,
        number: completedObjective.number,
        objective: completedObjective.objective,
        url: completedObjective.url,
        activity_id: completedObjective.activity_id,
        complete: activitiesResponse.complete,
        completion_time: activitiesResponse.completion_time
      })
    }, () => console.log('new currentUserObjectives', this.state.currentUserObjectives));
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

        this.updateCurrentUserObjectives(body, completedObjective)


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
        currentUserObjectives: body
      })
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
        { currentUser: body}
      )
      this.fetchUserObjectives(body.id)
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
          <Info currentUserObject={this.state.currentUser}/>
          <Activity />
        </div>
        <div className="right">
          <Scores/>
          <WorkingOn
            currentUserObjectivesObject={this.state.currentUserObjectives}
            receiveObjectiveStatus={this.receiveObjectiveStatus}
            receiveNextUserObjective={this.receiveNextUserObjective}
          />
          <History
            currentUserObjectivesObject={this.state.currentUserObjectives}
            receiveObjectiveStatus={this.receiveObjectiveStatus}
          />
        </div>
      </div>
    )
  }
}

export default Profile;
