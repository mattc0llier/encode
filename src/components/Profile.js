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
    this.state = { currentUser: [], currentUserActivities: [] };

    this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUserActivities(id){
    fetch(`/api/users/${id}/activities`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      console.log(body);
      this.setState({
        currentUserActivities: body
      })
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
      // fetchUserActivities()
      console.log(this.state.currentUser);
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount() {
    this.fetchUser(1);
    this.fetchUserActivities(1)
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
          <WorkingOn/>
          <History/>
        </div>
      </div>
    )
  }
}

export default Profile;
