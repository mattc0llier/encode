import React from 'react';
import Organizations from './Organizations';
import '../../styles/components/Info.scss';


const Info = ({ userProfileObject, userProfileCourses }) => {

    return(
      <div className="info">
        <img className="profile-pic" src={userProfileObject.photo} alt="profile picture" />
        <div className="name">
          <h3>{userProfileObject.first_name} {userProfileObject.last_name} </h3>
          <span id="private"><img src="../../static/assets/images/Lock.svg" id="lock"/><p>Private</p></span>
        </div>
        <p>{userProfileObject.bio}</p>
        <p>{userProfileObject.location}</p>
        <a href="#"><p>Build your public profile (coming soon)</p></a>
        <Organizations userProfileCourses={userProfileCourses}/>
      </div>
    )
  }

export default Info;
