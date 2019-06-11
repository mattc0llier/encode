import React from 'react';

class Scores extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="scores">
        <p>Scores</p>
        <span>32 23 12</span>
      </div>
    )
  }
}

export default Scores;
