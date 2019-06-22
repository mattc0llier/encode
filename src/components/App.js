import React from 'react';
import Homepage from './Homepage';
import Profile from './Profile';
import Nav from './Nav';
import Students from './Students';
import Leaderboard from './Leaderboard';
import Feed from './Feed';
import Footer from './Footer';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../../styles/components/App.scss';

class App extends React.Component {

  constructor(){
    super();
      this.state = { isLoggedIn: false }

  }

  render(){
    return(
      <Router>
        <React.Fragment>
          <Nav isLoggedIn={this.state.isLoggedIn} />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <PrivateRoute path="/feed" component={Feed} />
            <Route path="/leaderboard" component={Leaderboard} />
            <PrivateRoute path="/students" component={Students} />
            <PrivateRoute path="/users/:username" component={Profile} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
