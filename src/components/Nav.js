import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/components/Nav.scss';


class Nav extends React.Component {
  constructor(){
    super();
  }


  componentDidMount(){
  }

  render(){
    return(
      <div className="nav">
        <div className="nav-margin">
          { this.props.isLoggedIn ? (
            <Link to='/leaderboard'><h1>encode</h1></Link>
          ): (
            <Link to='/'><h1>encode</h1></Link>
          )}
          <ul className="right-nav">
            <Link to='/leaderboard'><li>Leaderboard</li></Link>
            { this.props.isLoggedIn ? (
              <React.Fragment>
                <Link to={`/users/${this.props.currentUser.username}`}><li>{this.props.currentUser.username}'s profile</li></Link>
                <p>🎓{this.props.currentUserScores.mastery} 🔥{this.props.currentUserScores.streak} ✅{this.props.currentUserScores.objectives}</p>
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
