import React from 'react';
import Objective from './Objective';
const startOfDay = require('date-fns/start_of_day')

import '../../styles/components/Status.scss';


class Status extends React.Component {
  constructor(){
    super();
  }

  render(){

    const latestObjectives = this.props.statusArray[1].sort(function(a, b) {
      return a.completion_time - b.completion_time;
    });
    console.log('latestObjectives', latestObjectives);
    return(
      <div className="status">
        <ul>
          <h3>{this.props.statusArray[0]}</h3>

          <div className="status-content">
            <div className="status-header">
              <img src={this.props.currentUserObject.photo} />
              <div className="header-info">
                <p>{this.props.currentUserObject.first_name} {this.props.currentUserObject.last_name}</p>
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
                <h4>Mastery Score</h4>
                <p>+5</p>
              </div>
            </div>
          </div>

        </ul>
      </div>
    )
  }
}

export default Status;
