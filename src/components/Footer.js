import React from 'react';
import '../../styles/components/Footer.scss';


class Info extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div className="footer">
        <p>Community empowerment inspired by <b><a href="https://getmakerlog.com/">Makerlog</a></b></p>
        <p>Made by <b><a href="https://twitter.com/mattc0llier">Matt</a></b></p>
      </div>
    )
  }
}

export default Info;
