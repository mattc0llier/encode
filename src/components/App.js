import React from 'react';
import Profile from './Profile';
import Nav from './Nav';

import '../../styles/components/App.scss';

class App extends React.Component {

  render(){
    return(
      <React.Fragment>
        <Nav />
        <Profile />
      </React.Fragment>
    )
  }
}

export default App;
