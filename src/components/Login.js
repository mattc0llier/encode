import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Field } from "formik";

import '../../styles/components/Login.scss';


class Login extends React.Component {
  constructor(){
    super();

    this.state = { redirect: false, loginUser: {username: "", password: ""}}

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLoginUserSubmit = this.handleLoginUserSubmit.bind(this)
  }

  handleUsernameChange(event){
    this.setState({
      loginUser: {
        username: event.target.value,
        password: this.state.loginUser.password
      }
    })
  }
  handlePasswordChange(event){
    this.setState({
      loginUser: {
        username: this.state.loginUser.username,
        password: event.target.value
      }
    })
  }

  handleLoginUserSubmit(event){
    event.preventDefault();
    console.log('hit 1');
    debugger
    this.setState({
      redirect: true
    })
    this.props.receiveLoginUser(this.state.loginUser)
    console.log('hit 2');

  }


  render(){
    if (this.state.redirect) return(<Redirect to={`/users/${this.props.currentUser.username}`} />)
     else return(
      <div className="form-center">
        <div className="loginUser">
          <h2>Enter login details</h2>
          <form  onSubmit={this.handleLoginUserSubmit}>
            <label for="username">Enter your username</label>
            <input name="username" type="text" className="loginUser__input" onChange={this.handleUsernameChange} placeholder="@ username" />
            <label for="username">and your password</label>
            <input name="password" type="password" className="loginUser__input" onChange={this.handlePasswordChange} placeholder="password" />
            <button type="submit" className="loginUser__button">Login</button>
          </form>
          <p>Don't have an account? <b><Link to='/users/new'>Sign up</Link></b></p>
        </div>

      </div>
    )
  }
}

export default Login;
