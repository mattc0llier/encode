import React from 'react';

import '../../styles/components/Nav.scss';


class Nav extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="nav">
        <h3>Encode Logo</h3>
        <div className="right-nav">
          <h3>Students</h3>
          <h3>Study Groups</h3>
          <h3>My profile</h3>
        </div>
      </div>
    )
  }
}

export default Nav;
