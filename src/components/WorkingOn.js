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

    this.props.receiveNextUserObjective(filteredObjects[0])


    return(
      <div className="workingOn">
        <h3>Working On</h3>
            <Objective
              objectiveObject={filteredObjects[0]}
              receiveObjectiveStatus={this.props.receiveObjectiveStatus}
            />
      </div>
    )
  }
}

export default WorkingOn;
