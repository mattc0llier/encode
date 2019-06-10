import React from 'react';
import Objective from './Objective';

class Status extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div class="status">
        <p>This is a Status</p>
        <ul>
        <Objective />
        </ul>
      </div>
    )
  }
}

export default Status;
