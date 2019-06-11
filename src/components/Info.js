import React from 'react';

class Info extends React.Component {
  constructor(){
    super();
  }

  render(){
    console.log('current user info', this.props.currentUserObject);
    return(
      <div className="info">
        <h4>Info</h4>
        <h3>{this.props.currentUserObject.first_name} {this.props.currentUserObject.last_name} </h3>
        <img src={this.props.currentUserObject.photo} alt="profile picture" />
        <p>{this.props.currentUserObject.bio}</p>
        <p>{this.props.currentUserObject.location}</p>
      </div>
    )
  }
}

export default Info;
