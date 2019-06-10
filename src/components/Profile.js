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
      <div>
      <h2>Matts profile page</h2>
        <div class="left">
          <h2>Left hand side</h2>
          <Info/>
        </div>
        <div class="right">
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
