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
  }

  receiveNextUserObjective(nextObjective){
    console.log('nextObjective', nextObjective);
  }

  receiveObjectiveStatus(completedObjective){
    //received completed objective
    //filter all current objectives to remove the completed one
    function removeComplete(userObjective) {
      return userObjective.id !== completedObjective.id
    }

    const updatedUserObjectives = this.state.currentUserObjectives.filter(removeComplete)

    //add the updated completed objective into the user objective state
    this.setState({
      currentUserObjectives: updatedUserObjectives.concat({
        id: completedObjective.id,
        lesson_id: completedObjective.lesson_id,
        number: completedObjective.number,
        objective: completedObjective.objective,
        url: completedObjective.url,
        complete: true,
        completion_time: Date.now(),
      })
    });
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
