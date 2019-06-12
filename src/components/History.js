import React from 'react';
import Status from './Status'
import Objective from './Objective'

class History extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div>
        <h3>History</h3>

        <Status/>
      </div>
    )
  }
}

export default History;
