import React from 'react';
import Objective from './Objective';
import { Link } from 'react-router-dom';


import '../../styles/components/Status.scss';


class Status extends React.Component {
  constructor(){
    super();

    this.state = { statusScores: {} }

    this.fetchObjectivesScores = this.fetchObjectivesScores.bind(this);
  }

  fetchObjectivesScores(latestObjectives){

    const lastestStatusTime = Date.parse(new Date(latestObjectives[latestObjectives.length - 1].completion_time))
    fetch(`/api/users/${this.props.statusArray[0].user_id}/objectives/complete/${lastestStatusTime}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        statusScores: body
      })
    })
    .catch(error => console.log(error.message))
  }

  render(){
    const statusMasteryIncrease = this.props.statusArray.reduce(function(acc, cur) {
      return acc + cur.mastery_score
    }, 0);

    const latestObjectives = this.props.statusArray.sort(function(a, b) {
      return b.completion_time - a.completion_time;
    });


    //manual settings for when images should show
    const firstObjective = this.props.statusArray.find(function(element) {
      return element.number == 1;
    });
    const lastObjective = this.props.statusArray.find(function(element) {
      return element.number == 44;
    });

    this.fetchObjectivesScores(latestObjectives)

    return(
      <div className="status">
        <ul>
          { !!lastObjective ? (
            <img id="complete" src="../../static/assets/images/lamda-web-precourse-complete.jpg" alt="your journey starts here" />
          ) : null}
          <div className="status-content">
          <Link to={`/users/${this.props.statusArray[0].username}`}>
            <div className="status-header">
              <img src={this.props.statusArray[0].photo} />
              <div className="header-info">
                <p>{this.props.statusArray[0].first_name} {this.props.statusArray[0].last_name}</p>
                <p>🎓 {this.state.statusScores.mastery} 🔥 {this.state.statusScores.streak} ✅ {this.state.statusScores.objectives}</p>
              </div>
            </div>
            </Link>
            <div className="status-completed">
              <div className="status-objectives">
                {latestObjectives.map(objective => (
                  <div key={objective.objective_id} className="status-objective">
                    <Objective objectiveObject={objective}/>
                  </div>
                ))}
                <div class="topic-notifications">
                  <p class="topic-notfication" >Javascript</p>
                  <p class="topic-notfication" >Software Engineering</p>
                  <p class="topic-notfication" >Job roles</p>
                  <p class="topic-notfication" >Javascript</p>
                  <p class="topic-notfication" >Software Engineering</p>
                  <p class="topic-notfication" >Job roles</p>
                  <p class="topic-notfication" >Javascript</p>
                  <p class="topic-notfication" >Software Engineering</p>
                  <p class="topic-notfication" >Job roles</p>
                </div>
              </div>

              <div className="score-increase">
                <p>+{statusMasteryIncrease}</p>
                <h4>Mastery Score</h4>
              </div>
            </div>
          </div>
          { !!firstObjective ? (
            <img id="enrolled" src="../../static/assets/images/lambda-web-development-precourse-started.jpg" alt="your journey starts here" />
          ) : null}
        </ul>
      </div>
    )
  }
}

export default Status;
