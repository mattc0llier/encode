import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/components/Nav.scss';


class Nav extends React.Component {
  constructor(){
    super();

    this.state = { currentUserScores: {} }

    this.currentUserScores = this.currentUserScores.bind(this);
  }

  currentUserScores(){
    fetch(`/api/users/${this.props.currentUser.user_id}/scores`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        currentUserScores: body
      }, () => console.log('currentUserScores', this.state.currentUserScores))

    })
    .catch(error => console.log(error.message));
  }

  componentDidMount(){
    this.currentUserScores()
  }

  render(){
    return(
      <div className="nav">
        <div className="nav-margin">
          { this.props.isLoggedIn ? (
            <Link to='/feed'><h1>encode</h1></Link>
          ): (
            <Link to='/'><h1>encode</h1></Link>
          )}
          <ul className="right-nav">
            <Link to='/leaderboard'><li>leaderboard</li></Link>
            <Link to='/feed'><li>feed</li></Link>
            { this.props.isLoggedIn ? (
              <React.Fragment>
                <Link to='/students'><li>students</li></Link>
                <Link to={`/users/${this.props.currentUser.username}`}><li>{this.props.currentUser.username}'s profile</li></Link>
                <p>🎓 32 🔥 23 ✅ 12</p>
                <Link to='/logout'><p>Log out</p></Link>

              </React.Fragment>
            ): (
              <React.Fragment>
              <Link to='/login'><p>Login</p></Link>
              <div className="button-cta">
                <Link to='/users/new'>
                  <button type="button" name="button">Sign up to wait list</button>
                </Link>
              </div>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav;
