import React from 'react';
import Objective from './Objective'
import '../../styles/components/WorkingOn.scss';


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
        <div className="next-objective">
          <Objective
            objectiveObject={filteredObjects[0]}
            receiveObjectiveStatus={this.props.receiveObjectiveStatus}
          />
        </div>

      </div>
    )
  }
}

export default WorkingOn;
