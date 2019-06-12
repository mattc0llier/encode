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
    this.state = { currentUser: [], currentUserObjectives: [] };

    this.fetchUser = this.fetchUser.bind(this);
    this.fetchUserObjectives = this.fetchUserObjectives.bind(this);
  }

  // fetchUserObjectives(){
  //   this.state.currentUserActivities
  //   fetch(`/api/activities/objectives`)
  //   .then(function(response){
  //     return response.json();
  //   })
  //   .then(body => {
  //     console.log(body);
  //   })
  // }

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
          <WorkingOn currentUserIncompleteActivitiesObject={this.state.currentUserActivities}/>
          <History currentUserCompletedActivitiesObject={this.state.currentUserActivities}/>
        </div>
      </div>
    )
  }
}

export default Profile;
