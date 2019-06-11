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
      console.log(this.state.objectives);
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount() {
    this.fetchObjective();
  }

  render(){
    return(
      <div className="workingOn">
        <p>WorkingOn</p>

        {this.state.objectives.map(objective => (
          <div key={objective.id}>
            <p>{objective.number} - {objective.objective}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default WorkingOn;
