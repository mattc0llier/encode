import React from 'react';


const Tags = ({ statusTags }) => {
  if (!statusTags.length) {
    return <p>no tags</p>
  }

    return(
      <div class="topic-notifications">
      {statusTags.map(tag => (
        <p key={tag.id} class="topic-notfication" >{tag.topic}</p>
      ))}
      </div>
    )
}


export default Tags;
