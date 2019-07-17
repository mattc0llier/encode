import React from 'react';
import '../../styles/components/Leaderboard.scss';

class Leaderboard extends React.Component {
  constructor(){
    super();
    this.state = { allUsers: [] }

    this.fetchAllStudents = this.fetchAllStudents.bind(this)
  }

  //Get all activities for the last Week
  // after todays date - 1 Week
  // group activities by users
  // Add up user mastery score
  // Sort users by mastery score and show top 10

  // fetchActivties(){
  //   fetch(`/api/activties/since/${earliestCompletionTime}`).
  //   .then(function(response) {
  //     return response.json()
  //   })
  //   .then(body => {
  //     console.log(body);
  //   })
  // }

  fetchAllStudents(){
    fetch(`/api/users`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState(
        { allUsers: body}
      )
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount(){
    this.fetchAllStudents()
  }


  render(){

    return(
      <div className="leaderboard">
        <div className="table-center">
          <div className="table-nav">
            <h1>Leaderboard</h1>
            <div className="title-filters">
              <h4>Today</h4>
              <h4>This week</h4>
              <h4>All time</h4>
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
                  <div className="mastery-cell">
                    <p>Mastery score</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.allUsers.map(user => (
                <tr className="leader">
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
                      <h3>{user.username}</h3>
                    </div>
                  </td>
                  <td>
                    <div className="course-cell">
                      <h3>Web Precourse</h3>
                    </div>
                  </td>
                  <td>
                    <div className="mastery-cell">
                      <h3>+46</h3>
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
