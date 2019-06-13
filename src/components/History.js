import React from 'react';
import Status from './Status'
import Objective from './Objective'

class History extends React.Component {
  constructor(){
    super();
  }

  render(){
    const sortedObjectives = this.props.currentUserObjectivesObject.sort(function(a, b) {
      return b.number - a.number;
    });
    const filteredObjects = sortedObjectives.filter(object => object.complete == true )
    return(
      <div className="history">
        <h3>History</h3>
        {filteredObjects.map(objective => (
          <div key={objective.id}>
            <Objective objectiveObject={objective}/>
          </div>
        ))}
        <Status/>
      </div>
    )
  }
}

export default History;
