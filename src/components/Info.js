import React from 'react';

class Info extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="info">
        <h4>Info</h4>
        <img src="../../static/assets/images/Roland.jpg" alt="profile picture" />
        <p>This is my bio</p>
        <p>This is my Location</p>
      </div>
    )
  }
}

export default Info;
