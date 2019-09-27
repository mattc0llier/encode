import React from 'react';
import '../../styles/components/Screencast.scss';


const Screencast = () => {

return(
  <div className="screencast">
    <div className="table-center">
    <iframe width="560" height="315" src="https://youtu.be/BrW97Ez3UX8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
  )
}

export default Screencast;
