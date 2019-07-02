import React from 'react';
import Objective from './Objective';
import { isToday } from 'date-fns'

import '../../styles/components/Status.scss';


class Status extends React.Component {
  constructor(){
    super();

    this.state = { statusScores: {} }

    this.fetchObjectivesScores = this.fetchObjectivesScores.bind(this);
  }

  fetchObjectivesScores(latestObjectives){

    const lastestStatusTime = Date.parse(new Date(latestObjectives[latestObjectives.length - 1].completion_time))
    console.log('lastestStatusTime', lastestStatusTime);
    fetch(`/api/users/${this.props.statusArray[0].user_id}/objectives/complete/${lastestStatusTime}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      console.log('fetched completedObjectives', body);
      this.setState({
        statusScores: body
      })
    })
    .catch(error => console.log(error.message))
  }

  render(){

    console.log('this.props.statusArray', this.props.statusArray);

    const statusMasteryIncrease = this.props.statusArray.reduce(function(acc, cur) {
      return acc + cur.mastery_score
    }, 0);

    const latestObjectives = this.props.statusArray.sort(function(a, b) {
      return a.completion_time - b.completion_time;
    });

    this.fetchObjectivesScores(latestObjectives)

    return(
      <div className="status">
        <ul>
          <div className="status-content">
            <div className="status-header">
              <img src={this.props.statusArray[0].photo} />
              <div className="header-info">
                <p>{this.props.statusArray[0].first_name} {this.props.statusArray[0].last_name}</p>
                <p>🎓{this.state.statusScores.mastery} 🔥23 ✅{this.state.statusScores.objectives}</p>
              </div>
            </div>
            <div className="status-completed">
              <div className="status-objectives">
                {latestObjectives.map(objective => (
                  <React.Fragment key={objective.objective_id}>
                    <Objective objectiveObject={objective}/>
                  </React.Fragment>
                ))}
              </div>
              <div className="score-increase">
                <p>+{statusMasteryIncrease}</p>
                <h4>Mastery Score</h4>
              </div>
            </div>
          </div>

        </ul>
      </div>
    )
  }
}

export default Status;
