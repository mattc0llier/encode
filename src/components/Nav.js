import React from 'react';

class Nav extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="nav">
        <h3>Nav</h3>
        <h3>Students</h3>
        <h3>Study Groups</h3>
        <h3>My profile</h3>
      </div>
    )
  }
}

export default Nav;
