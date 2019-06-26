import React from 'react';
import '../../styles/components/Login.scss';


class Login extends React.Component {
  constructor(){
    super();

    this.state = { loginUser: {
      username: "",
      password: ""
    }
  }

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
    this.props.receiveLoginUser(this.state.loginUser)
  }


  render(){
    return(
      <div className="loginUser">
        <h2>loginUser</h2>
        <form  onSubmit={this.handleLoginUserSubmit}>
          <input className="loginUser__input" onChange={this.handleUsernameChange} placeholder="@ username" />
          <input className="loginUser__input" onChange={this.handlePasswordChange} placeholder="password" />
          <button type="submit" className="loginUser__button">Login</button>
        </form>
      </div>
    )
  }
}

export default Login;
