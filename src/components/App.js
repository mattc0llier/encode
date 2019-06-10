import React from 'react';
import Profile from './Profile';
import Nav from './Nav';

import '../../styles/components/App.scss';

class App extends React.Component {

  render(){
    return(
      <React.Fragment>
        <h1>Encode</h1>
        <Nav />
        <Profile />
      </React.Fragment>
    )
  }
}

export default App;
