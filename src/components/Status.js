import React from 'react';
import Objective from './Objective';
import { isToday } from 'date-fns'

import '../../styles/components/Status.scss';


class Status extends React.Component {
  constructor(){
    super();
  }

  render(){

    console.log('this.props.statusArray', this.props.statusArray);

    const latestObjectives = this.props.statusArray.sort(function(a, b) {
      return a.completion_time - b.completion_time;
    });


    const statusMasteryTotal = latestObjectives.reduce(function(acc, cur) {
      return acc + cur.mastery_score
    }, 0);

    console.log('completedObjectives', this.props.completedObjectives)

    const cumulativeCompletedObjectives = this.props.completedObjectives.filter(status => {
      console.log(new Date(status.completion_time))
      const lastestStatusTime = new Date(latestObjectives[latestObjectives.length - 1].completion_time)
      const previousObjectiveTimes = new Date(status.completion_time)
      console.log('Date.parse(previousObjectiveTimes)', Date.parse(previousObjectiveTimes));
      console.log('lastestStatusTime.getDate()', Date.parse(lastestStatusTime));
       if (Date.parse(previousObjectiveTimes) <= Date.parse(lastestStatusTime)) {
         return true
       } else {
         return false
       }
    })
    console.log('cumulativeCompletedObjectives', cumulativeCompletedObjectives);
    const statusObjectivesScore = cumulativeCompletedObjectives.length
    console.log('statusObjectivesScore', statusObjectivesScore);
    const statusMasteryScore = cumulativeCompletedObjectives.reduce(function(acc, cur) {
      return acc + cur.mastery_score
    }, 0);
    console.log('statusMasteryScore', statusMasteryScore);




    return(
      <div className="status">
        <ul>
          <div className="status-content">
            <div className="status-header">
              <img src={this.props.statusArray[0].photo} />
              <div className="header-info">
                <p>{this.props.statusArray[0].first_name} {this.props.statusArray[0].last_name}</p>
                <p>🎓{statusMasteryScore} 🔥23 ✅{statusObjectivesScore}</p>
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
                <p>+{statusMasteryTotal}</p>
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
