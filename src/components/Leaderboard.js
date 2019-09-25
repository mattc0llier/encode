import React from 'react';
import {compareDesc, isToday, parse, format, subWeeks, startOfDay, getTime, startOfWeek } from 'date-fns';

import '../../styles/components/Leaderboard.scss';

class Leaderboard extends React.Component {
  constructor(){
    super();
    this.state = { allUsers: [], timeRange: 'week', timeRangeCompletedObjectives: [] }

    this.timeCalculator = this.timeCalculator.bind(this)
    this.sortByUser = this.sortByUser.bind(this)
    this.fetchActivties = this.fetchActivties.bind(this)
    this.calculateMasteryScores = this.calculateMasteryScores.bind(this)
    this.handleTodayClick = this.handleTodayClick.bind(this)
    this.handleThisWeekClick = this.handleThisWeekClick.bind(this)
    this.handleAllTimeClick = this.handleAllTimeClick.bind(this)
  }

  handleTodayClick(){
    console.log('today')
    this.setState({
      timeRange: 'day'
    }, () => this.fetchActivties())
  }
  handleThisWeekClick(){
    console.log('week')
    this.setState({
      timeRange: 'week'
    }, () => this.fetchActivties())
  }
  handleAllTimeClick(){
    console.log('all time')
    this.setState({
      timeRange: 'allTime'
    }, () => this.fetchActivties())
  }


  timeCalculator(){
    const timeNow = Date.now()
    if (this.state.timeRange == 'day'){
      const earliestCompletionTime = getTime(startOfDay(timeNow))
      return earliestCompletionTime
    } else if (this.state.timeRange == 'week') {
      const earliestCompletionTime = getTime(startOfWeek(timeNow))
      return earliestCompletionTime
    } else if (this.state.timeRange == 'allTime') {
      const earliestCompletionTime = 0
      return earliestCompletionTime
    }

  }

  fetchActivties(){
    const earliestCompletionTime = this.timeCalculator()
    fetch(`/api/activties/since/${earliestCompletionTime}`)
    .then(function(response) {
      return response.json()
    })
    .then(body => {
      console.log(body);
      this.setState({
        timeRangeCompletedObjectives: body
      }, () => this.sortByUser())
    })
    .catch(error => console.log(error.message));
  }

  sortByUser(){
    console.log("hit");
      function groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
          var key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, []);
      }

    var groupedPeople = groupBy(this.state.timeRangeCompletedObjectives, 'user_id');
    console.log('groupedPeople', groupedPeople);
    const filteredGroupedPeople = groupedPeople.filter(user => !!user)
    console.log('filteredGroupedPeople', filteredGroupedPeople);
    this.setState({
      allUsers: filteredGroupedPeople
    }, () => this.calculateMasteryScores())
  }
  calculateMasteryScores(){
    const mapEachUser = this.state.allUsers.map(user => (

     {
        id: user[0].user_id,
        username: user[0].username,
        photo: user[0].photo,
        location:user[0].location,
        mastery_score: (
          user.reduce(function(acc, cur) {
           return acc + cur.mastery_score
          }, 0)
        )
      }
    ))
    console.log('mapEachUser', mapEachUser);
    const userSortedByMasteryScore = mapEachUser.sort(function(a, b){
      return b.mastery_score - a.mastery_score
    })
    console.log('userSortedByMasteryScore', userSortedByMasteryScore);
    this.setState({
      allUsers: userSortedByMasteryScore
    })
  }

  componentDidMount(){
    this.fetchActivties()
  }


  render(){

    return(
      <div className="leaderboard">
        <div className="table-center">
          <div className="table-nav">
            <h1>Leaderboard</h1>
            <div className="title-filters">
              <h4 onClick={this.handleTodayClick} style={this.state.timeRange == 'today' ? {'border-bottom': 'solid 3px #FF5352'}: null }>Today</h4>
              <h4 onClick={this.handleThisWeekClick}>This week</h4>
              <h4 onClick={this.handleAllTimeClick}>All time</h4>
            </div>
          </div>
          <table>
            <thead>
              <tr className="leader">
                <th>
                  <div className="rank-cell">
                    <p>Rank</p>
                  </div>
                </th>
                <th>
                  <div className="photo-cell">
                    <img src="/static/assets/images/default-profile.png" alt="profile pic"/>
                  </div>
                </th>
                <th>
                  <div className="username-cell">
                    <p>Username</p>
                  </div>
                </th>
                <th>
                  <div className="course-cell">
                    <p>Course</p>
                  </div>
                </th>
                <th>
                  <div className="location-cell">
                    <p>Location</p>
                  </div>
                </th>
                <th>
                  <div className="mastery-cell">
                    <p>Mastery score</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.allUsers.map(user => (
                <tr className="leader" style={!!this.props.isLoggedIn && this.props.currentUser.user_id === user.id ? {background: '#C3C3C3'}: null }>
                  <td>
                    <div className="rank-cell">
                      <p>{this.state.allUsers.indexOf(user) + 1}</p>
                    </div>
                  </td>
                  <td>
                    <div className="photo-cell">
                      <img src={user.photo} alt="profile pic"/>
                    </div>
                  </td>
                  <td>
                    <div className="username-cell">
                      <p>{user.username}</p>
                    </div>
                  </td>
                  <td>
                    <div className="course-cell">
                      <p>Web Precourse</p>
                    </div>
                  </td>
                  <td>
                    <div className="location-cell">
                      <p>{!!user.location ? user.location : "unkown"}</p>
                    </div>
                  </td>
                  <td>
                    <div className="mastery-cell">
                      <p>+{user.mastery_score}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Leaderboard;
