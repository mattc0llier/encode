import React from 'react';
import Courses from './Courses';
import '../../styles/components/Info.scss';


const Info = ({ userProfileObject, userProfileCourses }) => {

    return(
      <div className="info">
        <img className="profile-pic" src={userProfileObject.photo} alt="profile picture" />
        <h3>{userProfileObject.first_name} {userProfileObject.last_name} </h3>
        <p>{userProfileObject.bio}</p>
        <p>{userProfileObject.location}</p>
        <Courses userProfileCourses={userProfileCourses}/>
      </div>
    )
  }

export default Info;
