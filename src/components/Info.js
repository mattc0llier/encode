import React from 'react';
import '../../styles/components/Info.scss';


class Info extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="info">
        <img src={this.props.userProfileObject.photo} alt="profile picture" />
        <h3>{this.props.userProfileObject.first_name} {this.props.userProfileObject.last_name} </h3>
        <p>{this.props.userProfileObject.bio}</p>
        <p>{this.props.userProfileObject.location}</p>
        <img src="/static/assets/images/Organizations.png"/>
      </div>
    )
  }
}

export default Info;
