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
import Settings from './Settings';
import PrivateRoute from './PrivateRoute';
import CelebrationAnimation from './CelebrationAnimation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../../styles/components/App.scss';

class App extends React.Component {

  constructor(){
    super();
      this.state = { isLoggedIn: false, currentUser: {}, currentUserScores: {}, celebration: "achievement-wrapper" }

      this.receiveNewUser = this.receiveNewUser.bind(this);
      this.createNewUser = this.createNewUser.bind(this);
      this.receiveLoginUser = this.receiveLoginUser.bind(this);
      this.checkLoggedIn = this.checkLoggedIn.bind(this);
      this.calculateCurrentUserScores = this.calculateCurrentUserScores.bind(this);
      this.receiveCurrentUserObjectiveUpdate = this.receiveCurrentUserObjectiveUpdate.bind(this);
      this.receiveLoggedOutUser = this.receiveLoggedOutUser.bind(this);
  }

  receiveCurrentUserObjectiveUpdate(){
    this.calculateCurrentUserScores()
    console.log('do animation');
    this.setState({
      celebration: 'achievement-wrapper animation'
    })

  }

  receiveNewUser(user){
    this.createNewUser(user)
  }

  receiveLoginUser(user){
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
      this.setState({
        currentUser: body,
        isLoggedIn: true
      })
      this.calculateCurrentUserScores()
    })
  }

  receiveLoggedOutUser(){
      fetch(`/logout`, {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.setState({
          currentUser: {},
          isLoggedIn: false
        })
      })
  }

  createNewUser(user, receiveLoginUser){
    fetch(`/api/users/create`, {
      method: 'POST',
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
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
      this.receiveLoginUser(body)
      // this.setState({
      //   currentUser: body,
      //   isLoggedIn: true
      // })
    })
  }
  // this needs to check for a cookie and see if user is already logged in
  checkLoggedIn(){
    fetch(`/api/auth/account`)
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`HTTP Error ${response.status} (${response.statusText})`);
      })
      .then(body => {
        this.setState({
          currentUser: body,
          isLoggedIn: true
        })
        this.calculateCurrentUserScores()
      })
  }


  calculateCurrentUserScores(){
    const timeNow = Date.now()
    fetch(`/api/users/${this.state.currentUser.user_id}/objectives/complete/${timeNow}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        currentUserScores: body
      })

    })
    .catch(error => console.log(error.message));
  }

  componentDidMount(){
    this.checkLoggedIn()
  }

  render(){
    return(
      <Router>
        <React.Fragment>
          <Nav isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser} currentUserScores={this.state.currentUserScores}/>
          <main>
            <Switch>
              <Route path="/" exact
                component={Homepage}
              />
              <Route path="/feed"
                render={(props) => (<Feed {...props} currentUser={this.state.currentUser} />)}
              />
              <Route path="/leaderboard"
                render={(props) => (<Leaderboard {...props} currentUser={this.state.currentUser} isLoggedIn={this.state.isLoggedIn}/>)}
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
                receiveCurrentUserObjectiveUpdate={this.receiveCurrentUserObjectiveUpdate}
                />)}
              />
              <Route path="/start"
                render={(props) => (<Start {...props} currentUser={this.state.currentUser} />)}
              />
              <Route path="/settings"
                render={(props) => (<Settings {...props} currentUser={this.state.currentUser} receiveLoggedOutUser={this.receiveLoggedOutUser}/>)}
              />
            </Switch>
          </main>
          <CelebrationAnimation celebration={this.state.celebration} />
          <Footer />
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
