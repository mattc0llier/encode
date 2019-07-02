import React from 'react';
import Homepage from './Homepage';
import Profile from './Profile';
import Nav from './Nav';
import Students from './Students';
import Leaderboard from './Leaderboard';
import Feed from './Feed';
import Footer from './Footer';
import NewUser from './NewUser';
import Login from './Login';
import Start from './Start';
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
      this.receiveLoginUser = this.receiveLoginUser.bind(this);
      this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }

  //setApp currentUser from slack sign in and db response
  setCurrentUser(user){
    console.log(user);
    this.setState({
      currentUser: user
    })
  }

  receiveNewUser(user){
    console.log(user);
    this.createNewUser(user)
  }

  receiveLoginUser(user){
    console.log(user);
    fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: user.username,
        password: user.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      console.log('loggedInUser', body);
      this.setState({
        currentUser: body,
        isLoggedIn: true
      })
    })
  }

  createNewUser(user, receiveLoginUser){
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
      console.log('newUser', body);
      this.receiveLoginUser(body)
      // this.setState({
      //   currentUser: body,
      //   isLoggedIn: true
      // })
    })
  }

  checkLoggedIn(){
    fetch(`/api/auth/account`)
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`HTTP Error ${response.status} (${response.statusText})`);
      })
  }

  componentDidMount(){
    // this.checkLoggedIn()
  }

  render(){
    return(
      <Router>
        <React.Fragment>
          <Nav isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser}/>
          <main>
            <Switch>
              <Route path="/" exact
                component={Homepage}
              />
              <Route path="/feed"
                render={(props) => (<Feed {...props} currentUser={this.state.currentUser} />)}
              />
              <Route path="/leaderboard"
                render={(props) => (<Leaderboard {...props} currentUser={this.state.currentUser} />)}
              />
              <Route path="/users/new"
                render={(props) => (<NewUser {...props} receiveNewUser={this.receiveNewUser} />)}
              />
              <Route path="/login"
                render={(props) => (<Login {...props} receiveLoginUser={this.receiveLoginUser} />)}
              />
              <Route path="/students"
                render={(props) => (<Students {...props}
                isLoggedIn={this.state.isLoggedIn}
                currentUser={this.state.currentUser}
                />)}
              />
              <Route path="/users/:username"
                render={(props) => (<Profile {...props}
                  isLoggedIn={this.state.isLoggedIn}
                currentUser={this.state.currentUser}
                />)}
              />
              <Route path="/start"
                render={(props) => (<Start {...props} />)}
              />
            </Switch>
          </main>
          <Footer />
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
