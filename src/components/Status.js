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
          <h4>{this.props.statusArray[0]}</h4>
          {console.log('status', this.props.statusArray[1])}
          <div className="status-objectives">
            {latestObjectives.map(objective => (
              <div key={objective.objective_id}>
                <Objective objectiveObject={objective}/>
              </div>
            ))}
          </div>

        </ul>
      </div>
    )
  }
}

export default Status;
