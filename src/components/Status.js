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
          {console.log('status', this.props.statusArray[1])}
          <div className="status-objectives">
            {latestObjectives.map(objective => (
              <React.Fragment className="" key={objective.objective_id}>
                <Objective objectiveObject={objective}/>
              </React.Fragment>
            ))}
          </div>

        </ul>
      </div>
    )
  }
}

export default Status;
