import React from 'react';
import '../../styles/components/Leaderboard.scss';

class Leaderboard extends React.Component {
  constructor(){
    super();
  }

  render(){

    return(
      <div className="leaderboard">

        <h1>Leaderboard</h1>
        <div className="title-filters">
          <h4>This week</h4>
          <h4>This month</h4>
          <h4>All time</h4>
        </div>


      </div>
    )
  }
}

export default Leaderboard;
