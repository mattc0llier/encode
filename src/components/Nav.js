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
          { this.props.isLoggedIn ? (
            <React.Fragment>
              <Link to='/students'><li>students</li></Link>
              <Link to='/users/matt'><li>profile</li></Link>
            </React.Fragment>
          ): (
            <a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=586033553927.659635767442"><img src="https://api.slack.com/img/sign_in_with_slack.png" /></a>
          )}

        </ul>
      </div>
    )
  }
}

export default Nav;
