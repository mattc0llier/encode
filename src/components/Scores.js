import React from 'react';

class Scores extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="scores">
        <h2>🎓 {this.props.userProfileScoresObject.mastery} 🔥 {this.props.userProfileScoresObject.streak} ✅ {this.props.userProfileScoresObject.objectives}</h2>
      </div>
    )
  }
}

export default Scores;
