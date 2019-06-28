import React from 'react';

class Scores extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="scores">
        <h2>🎓 {this.props.userProfileScoresObject.mastery} 🔥 {this.props.userProfileScoresObject.streak} ✅ {this.props.userProfileScoresObject.objective_count}</h2>
      </div>
    )
  }
}

export default Scores;
