import React from 'react';
import Objective from './Objective'

class WorkingOn extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div class="workingOn">
        <p>WorkingOn</p>
        <Objective />
      </div>
    )
  }
}

export default WorkingOn;
