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
          <Link to='/students'><li>students</li></Link>
          <Link to='/groups'><li>study groups</li></Link>
          <Link to='/users/matt'><li>profile</li></Link>
        </ul>
      </div>
    )
  }
}

export default Nav;
