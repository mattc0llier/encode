import React from 'react';
import '../../styles/components/Courses.scss';


const Courses = ({ userProfileCourses }) => {

  if (!userProfileCourses.length) {
    return <p>no courses</p>
  }

  return(
    <div className="courses">
      <img src={userProfileCourses[0].badge} />
      <div className="course-title">
        <b><p>{userProfileCourses[0].name}</p></b>
        <p>Lambda School</p>
      </div>
    </div>
    )
}

export default Courses;
