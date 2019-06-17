import React from 'react';
import Objective from './Objective';

class Status extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="status">
        <ul>
          <p>This is a Status</p>
          <p>{this.props.statusArray[0]}</p>
          {console.log('status', this.props.statusArray[1])}
          {this.props.statusArray[1].map(objective => (
            <Objective objectiveObject={objective}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default Status;
