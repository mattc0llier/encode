import React from 'react';
import Scores from './Scores';
import Info from './Info';
import WorkingOn from './WorkingOn';
import History from './History';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { currentUser: []}
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
          <h2>Left hand side</h2>
          <Info currentUserObject={this.state.currentUser}/>
        </div>
        <div className="right">
          <h2>right hand side</h2>
          <Scores/>
          <WorkingOn/>
          <History/>
        </div>
      </div>
    )
  }
}

export default Profile;
