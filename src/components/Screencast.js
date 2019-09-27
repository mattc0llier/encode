import React from 'react';
import '../../styles/components/Screencast.scss';


const Screencast = () => {

return(
  <div className="screencast">
    <div className="table-center">
      <iframe width="1280" height="720" src="https://www.youtube.com/embed/BrW97Ez3UX8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
  )
}

export default Screencast;
