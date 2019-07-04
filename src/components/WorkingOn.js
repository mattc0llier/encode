import React from 'react';
import Objective from './Objective'
import { Link } from 'react-router-dom'
import '../../styles/components/WorkingOn.scss';


class WorkingOn extends React.Component {
  constructor(){
    super();

  }

  render(){
    console.log('this.props.userProfileObjectivesObject', this.props.userProfileObjectivesObject);
    const sortedObjectives = this.props.userProfileObjectivesObject.sort(function(a, b) {
      return a.number - b.number;
    });
    const filteredObjects = sortedObjectives.filter(objective => objective.complete == false )

    this.props.receiveNextUserObjective(filteredObjects[0])


    return(
      <div className="workingOn">
        <h3>Working On</h3>
        <div className="next-objective">
        { this.props.receiveNextUserObjective ? (
          <Objective
            objectiveObject={filteredObjects[0]}
            receiveObjectiveStatus={this.props.receiveObjectiveStatus}
            currentUserProfile={this.props.currentUserProfile}
          />
        ) : (
          <Link to='/start'><h2>Pick a new course</h2></Link>
        )}


        </div>

      </div>
    )
  }
}

export default WorkingOn;
