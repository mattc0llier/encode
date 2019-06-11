import React from 'react';

class Info extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="info">
        <img src={this.props.currentUserObject.photo} alt="profile picture" />
        <h3>{this.props.currentUserObject.first_name} {this.props.currentUserObject.last_name} </h3>
        <p>{this.props.currentUserObject.bio}</p>
        <p>{this.props.currentUserObject.location}</p>
      </div>
    )
  }
}

export default Info;
