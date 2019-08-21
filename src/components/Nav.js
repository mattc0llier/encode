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
      <div className="nav" role="navigation">
        <div className="nav-margin">
          { this.props.isLoggedIn ? (
            <Link to={`/users/${this.props.currentUser.username}`}><h1>encode</h1></Link>
          ): (
            <Link to='/'><h1>encode</h1></Link>
          )}
          <ul className="right-nav">
            <Link to='/leaderboard'><li>Leaderboard</li></Link>
            { this.props.isLoggedIn ? (
              <React.Fragment>
                  <li><a href="#" aria-haspopup="true">{this.props.currentUser.username}</a>
                    <ul class="dropdown" aria-label="submenu">
                      <li><Link to={`/users/${this.props.currentUser.username}`}>Your Profile</Link></li>
                      <li><Link to={`/settings`}>Settings</Link></li>
                      <li><Link to={`/settings`}>Logout</Link></li>
                    </ul>
                  </li>
                <li>🎓{this.props.currentUserScores.mastery} 🔥{this.props.currentUserScores.streak} ✅{this.props.currentUserScores.objectives}</li>
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
