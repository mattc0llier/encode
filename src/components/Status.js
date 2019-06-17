import React from 'react';
import Objective from './Objective';
const startOfDay = require('date-fns/start_of_day')

import '../../styles/components/Status.scss';


class Status extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="status">
        <ul>
          <h4>{this.props.statusArray[0]}</h4>
          {console.log('status', this.props.statusArray[1])}
          {this.props.statusArray[1].map(objective => (
            <div key={objective.id}>
              <Objective objectiveObject={objective}/>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

export default Status;
