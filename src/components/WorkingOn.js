import React from 'react';
import Objective from './Objective'
import { Link } from 'react-router-dom'
import '../../styles/components/WorkingOn.scss';

const WorkingOn = ({ userProfileObjectivesObject, receiveNextUserObjective, receiveObjectiveStatus, currentUserProfile }) => {

  if (!userProfileObjectivesObject.length) {
    return (
      <div className="workingOn">
        <h3>Working On</h3>
        <div className="next-objective">
          <div className="button-cta">
            <Link to='/start'>
              <button type="button" name="button">Start a new course</button>
            </Link>
          </div>
        </div>
      </div>)
  }

  console.log('this.props.userProfileObjectivesObject', userProfileObjectivesObject);
  const sortedObjectives = userProfileObjectivesObject.sort(function(a, b) {
    return a.number - b.number;
  });
  const filteredObjects = sortedObjectives.filter(objective => objective.complete == false )

  receiveNextUserObjective(filteredObjects[0])

  return(
    <div className="workingOn">
      <h3>Working On</h3>
      <div className="next-objective">
      { receiveNextUserObjective ? (
        <Objective
          objectiveObject={filteredObjects[0]}
          receiveObjectiveStatus={receiveObjectiveStatus}
          currentUserProfile={currentUserProfile}
        />
      ) : (
        <Link to='/start'><h2>Pick a new course</h2></Link>
      )}


      </div>

    </div>
  )
}

export default WorkingOn;
