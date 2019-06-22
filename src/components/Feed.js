import React from 'react';
import '../../styles/components/Feed.scss';


class Feed extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="feed">
        <p>This a feed of all of the latest updates in your network</p>
      </div>
    )
  }
}

export default Feed;
