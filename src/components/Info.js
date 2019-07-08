import React from 'react';
import '../../styles/components/Info.scss';


class Info extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="info">
        <img className="profile-pic" src={this.props.userProfileObject.photo} alt="profile picture" />
        <h3>{this.props.userProfileObject.first_name} {this.props.userProfileObject.last_name} </h3>
        <p>{this.props.userProfileObject.bio}</p>
        <p>{this.props.userProfileObject.location}</p>
        <div className="courses">
          <span><img src="/static/assets/images/lambda-precourse-logo.svg"/></span>
          <div className="course-title">
            <b><p>Web Precourse</p></b>
            <p>Lambda School</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Info;
