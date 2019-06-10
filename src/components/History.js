import React from 'react';
import Status from './Status'

class History extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div>
        <p>History</p>
        <Status/>
      </div>
    )
  }
}

export default History;
