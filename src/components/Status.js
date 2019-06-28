import React from 'react';
import Objective from './Objective';
import { isToday } from 'date-fns'

import '../../styles/components/Status.scss';


class Status extends React.Component {
  constructor(){
    super();
  }

  render(){

    console.log('this.props.statusArray', this.props.statusArray);

    const latestObjectives = this.props.statusArray.sort(function(a, b) {
      return a.completion_time - b.completion_time;
    });


    const statusMasteryTotal = latestObjectives.reduce(function(acc, cur) {
      return acc + cur.mastery_score
    }, 0);



    return(
      <div className="status">
        <ul>
          <div className="status-content">
            <div className="status-header">
              <img src={this.props.statusArray[0].photo} />
              <div className="header-info">
                <p>{this.props.statusArray[0].first_name} {this.props.statusArray[0].last_name}</p>
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
