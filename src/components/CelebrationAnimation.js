import React from 'react';
import '../../styles/_animation.scss';

class CelebrationAnimation extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    function masteryCopy(mastery_score){
      if(mastery_score = '1'){
        return "Remember"
      } else if (mastery_score = 2){
        return "Understand"
      } else if (mastery_score = 3){
        return "Apply"
      } else if (mastery_score = 4){
        return "Analyze"
      } else if (mastery_score = 5){
        return "Evaluate"
      } else if (mastery_score = 6){
        return "Create"
      }
    }

    const celebrationCopy = masteryCopy(this.props.completedObjective.mastery_score)

    return(
      <div className="celebration-animation">
        <div className={this.props.celebration}>
          <div className="achievement-super">
            <div className="achievement-body">
              <p className="achievement-text">{celebrationCopy}</p>
              <p className="achievement-subtext">{this.props.completedObjective.objective}</p>
            </div>
            <div className="achievement-title">
              <h3>+ {this.props.completedObjective.mastery_score}</h3>
            </div>
          </div>
        </div>
      </div>
      )
    }
}

export default CelebrationAnimation;
