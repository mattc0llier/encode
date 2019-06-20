import React from 'react';
import Homepage from './Homepage';
import Profile from './Profile';
import Nav from './Nav';
import Students from './Students';
import Leaderboard from './Leaderboard';
import Footer from './Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../../styles/components/App.scss';

class App extends React.Component {

  render(){
    return(
      <Router>
        <React.Fragment>
          <Nav />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/students" component={Students} />
            <Route path="/users/:username" component={Profile} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
