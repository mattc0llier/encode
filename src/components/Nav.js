import React from 'react';

import '../../styles/components/Nav.scss';


class Nav extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="nav">
        <a href="/"><h1>encode</h1></a>
        <div className="right-nav">
          <h3>students</h3>
          <h3>study groups</h3>
          <h3>profile</h3>
        </div>
      </div>
    )
  }
}

export default Nav;
