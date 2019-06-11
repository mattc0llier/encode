import React from 'react';
import Scores from './Scores';
import Info from './Info';
import WorkingOn from './WorkingOn';
import History from './History';

class Profile extends React.Component {
  constructor() {
    super();
  }

  render(){
    return(
      <div className="profile">
        <div className="left">
          <h2>Left hand side</h2>
          <Info/>
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
