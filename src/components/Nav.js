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
          <a href="/"><h3>students</h3></a>
          <a href="/"><h3>study groups</h3></a>
          <a href="/user/1"><h3>profile</h3></a>
        </div>
      </div>
    )
  }
}

export default Nav;
