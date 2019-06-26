import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/components/Nav.scss';


class Nav extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="nav">
        <Link to='/'><h1>encode</h1></Link>
        <ul className="right-nav">
          <Link to='/leaderboard'><li>leaderboard</li></Link>
          <Link to='/feed'><li>feed</li></Link>
          { this.props.isLoggedIn ? (
            <React.Fragment>
              <Link to='/students'><li>students</li></Link>
              <Link to={`/users/${this.props.currentUser.username}`}><li>profile</li></Link>
              <p>Log out</p>
            </React.Fragment>
          ): (
            <React.Fragment>
            <div className="button-cta">
              <Link to='/users/new'>
                <button type="button" name="button">Sign up to wait list</button>
              </Link>
            </div>
            </React.Fragment>
          )}

        </ul>
      </div>
    )
  }
}

export default Nav;
