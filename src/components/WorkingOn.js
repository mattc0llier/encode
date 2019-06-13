import React from 'react';
import Objective from './Objective'

class WorkingOn extends React.Component {
  constructor(){
    super();
  }

  render(){
    const sortedObjectives = this.props.currentUserObjectivesObject.sort(function(a, b) {
      return a.number - b.number;
    });
    const filteredObjects = sortedObjectives.filter(objective => objective.complete == false )
    console.log('first in array', filteredObjects[0]);


    return(
      <div className="workingOn">
        <h3>Working On</h3>
        {filteredObjects.map(objective => (
          <div key={objective.id}>
            <Objective
              objectiveObject={objective}
              receiveObjectiveStatus={this.props.receiveObjectiveStatus}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default WorkingOn;
