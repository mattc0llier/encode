import React from 'react';
import Homepage from './Homepage';
import Profile from './Profile';
import Nav from './Nav';
import Students from './Students';
import Leaderboard from './Leaderboard';
import Feed from './Feed';
import Footer from './Footer';
import NewUser from './NewUser';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../../styles/components/App.scss';

class App extends React.Component {

  constructor(){
    super();
      this.state = { isLoggedIn: false, currentUser: {} }

      this.receiveNewUser = this.receiveNewUser.bind(this);
      this.createNewUser = this.createNewUser.bind(this);
      this.setCurrentUser = this.setCurrentUser.bind(this);

  }

  //setApp currentUser from slack sign in and db response
  setCurrentUser(user){
    console.log(user);
    this.setState({
      currentUser: user
    })
  }

  createNewUser(user){
    fetch(`/api/users/create`, {
      method: 'POST',
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      console.log(body);
    })
  }

  receiveNewUser(user){
    console.log(user);
  }

  render(){
    return(
      <Router>
        <React.Fragment>
          <Nav isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser}/>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/feed" component={Feed} currentUser={this.state.currentUser} />
            <Route path="/leaderboard" component={Leaderboard} currentUser={this.state.currentUser} />
            <Route path="/users/new" component={NewUser} receiveNewUser={this.receiveNewUser} />
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
