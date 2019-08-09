import React from 'react';
import '../../styles/components/Organizations.scss';


const Organizations = ({ userProfileCourses }) => {

  if (!userProfileCourses.length) {
    return <p>no courses</p>
  }

  return(
    <div className="organizations">
      <div className="organization-list">
        <img src={userProfileCourses[0].badge} />
        <div className="organization-title">
          <b><p>{userProfileCourses[0].name}</p></b>
        </div>
      </div>
    </div>
    )
}

export default Organizations;
