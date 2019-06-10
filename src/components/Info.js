import React from 'react';

class Info extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div class="info">
        <h4>Info</h4>
        <img src="#" alt="profile picture" />
        <p>This is my bio</p>
        <p>This is my Location</p>
      </div>
    )
  }
}

export default Info;
