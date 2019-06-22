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
      this.state = { isLoggedIn: false, currentUser: {} }

  }

  setCurrentUser(user){
    console.log(user);
    this.setState({
      currentUser: user
    })
  }

  render(){
    return(
      <Router>
        <React.Fragment>
          <Nav isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser}/>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <PrivateRoute path="/feed" component={Feed} currentUser={this.state.currentUser} />
            <Route path="/leaderboard" component={Leaderboard} currentUser={this.state.currentUser} />
            <PrivateRoute path="/students" component={Students} currentUser={this.state.currentUser} />
            <PrivateRoute path="/users/:username" component={Profile} currentUser={this.state.currentUser} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
