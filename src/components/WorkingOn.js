import React from 'react';
import Objective from './Objective'

class WorkingOn extends React.Component {
  constructor(){
    super();

    this.state = { objectives: [] };
    this.fetchObjective = this.fetchObjective.bind(this);
  }

  fetchObjective(){
    fetch(`/api/objectives`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState(
        { objectives: body }
      )
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount() {
    this.fetchObjective();
  }

  render(){
    const sortedObjectives = this.state.objectives.sort(function(a, b) {
      return a.number - b.number;
    });

    return(
      <div className="workingOn">
        <p>WorkingOn</p>
        {sortedObjectives.map(objective => (
          <div key={objective.id}>
            <Objective objectiveObject={objective}/>
          </div>
        ))}
      </div>
    )
  }
}

export default WorkingOn;
