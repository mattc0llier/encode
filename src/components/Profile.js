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
    console.log('profile receiving objective', completedObjective);
    const updatedUserObjectives = this.state.currentUserObjectives.filter(userObjective =>
      userObjective.id !== objective.id
    )
    console.log('updatedUserObjectives', updatedUserObjectives);
    this.setState({
      currentUserObjectives: updatedUserObjectives.concat({
        complete: true,
        completion_time: Date.now(),
        id: completedObjective.id,
        lesson_id: completedObjective.lesson_id,
        number: completedObjective.number,
        objective: completedObjective.objective,
        url: completedObjective.url
      })
    });
    console.log('new currentUserObjectives', this.state.currentUserObjectives);

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
      console.log('user objectives', this.state.currentUserObjectives);
    })
    .catch(error => console.log(error.message));
  }

  fetchUser(id){
    fetch(`/api/users/${id}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState(
        { currentUser: body}
      )
      this.fetchUserObjectives(body.id)
      console.log(this.state.currentUser);
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount() {
    this.fetchUser(1);
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
