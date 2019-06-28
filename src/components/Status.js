import React from 'react';
import Objective from './Objective';
import { isToday } from 'date-fns'

import '../../styles/components/Status.scss';


class Status extends React.Component {
  constructor(){
    super();
  }

  render(){

    const latestObjectives = this.props.statusArray[1].sort(function(a, b) {
      return a.completion_time - b.completion_time;
    });


    const statusMasteryTotal = latestObjectives.reduce(function(acc, cur) {
      return acc + cur.mastery_score
    }, 0);



    return(
      <div className="status">
        <ul>
          <h3>{this.props.statusArray[0]}</h3>

          <div className="status-content">
            <div className="status-header">
              <img src={this.props.userProfileObject.photo} />
              <div className="header-info">
                <p>{this.props.userProfileObject.first_name} {this.props.userProfileObject.last_name}</p>
                <p>🎓32 🔥23 ✅12</p>
              </div>
            </div>
            <div className="status-completed">
              <div className="status-objectives">
                {latestObjectives.map(objective => (
                  <React.Fragment key={objective.objective_id}>
                    <Objective objectiveObject={objective}/>
                  </React.Fragment>
                ))}
              </div>
              <div className="score-increase">
                <p>+{statusMasteryTotal}</p>
                <h4>Mastery Score</h4>
              </div>
            </div>
          </div>

        </ul>
      </div>
    )
  }
}

export default Status;
