import React from 'react';
import '../../styles/components/Scores.scss';

class Scores extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="scores">
        <div className="score">
          <p>Mastery Score</p>
          <h2>🎓 {this.props.userProfileScoresObject.mastery}</h2>
        </div>
        <div className="score">
          <p>Streak</p>
          <h2>🔥 {this.props.userProfileScoresObject.streak}</h2>
        </div>
        <div className="score">
          <p>Objectives</p>
          <h2>✅ {this.props.userProfileScoresObject.objectives}</h2>
        </div>
      </div>
    )
  }
}

export default Scores;
