import React from 'react';

class NewUser extends React.Component {
  constructor(){
    super();

    this.state = { newUser: {
      username: "",
      email: "",
      password: ""
    }
  }

    this.handleCreateUsernameChange = this.handleCreateUsernameChange.bind(this)
    this.handleCreateEmailChange = this.handleCreateEmailChange.bind(this)
    this.handleCreatePasswordChange = this.handleCreatePasswordChange.bind(this)
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this)
  }

  handleCreateUsernameChange(event){
    this.setState({
      newUser: {
        username: event.target.value,
        email: this.state.newUser.email,
        password: this.state.newUser.password
      }
    })
  }
  handleCreateEmailChange(event){
    this.setState({
      newUser: {
        username: this.state.newUser.username,
        email: event.target.value,
        password: this.state.newUser.password
      }
    })
  }
  handleCreatePasswordChange(event){
    this.setState({
      newUser: {
        username: this.state.newUser.username,
        email: this.state.newUser.email,
        password: event.target.value
      }
    })
  }

  handleCreateUserSubmit(event){
    event.preventDefault();
    this.props.receiveNewUser(this.state.newUser)
  }


  render(){
    return(
      <div className="newUser">
        <h2>NewUser</h2>
        <form  onSubmit={this.handleCreateUserSubmit}>
          <input className="newUser__input" onChange={this.handleCreateUsernameChange} placeholder="@ username" />
          <input className="newUser__input" onChange={this.handleCreateEmailChange} placeholder="email" />
          <input className="newUser__input" onChange={this.handleCreatePasswordChange} placeholder="password" />
          <button type="submit" className="newUser__button">Create user</button>
        </form>
      </div>
    )
  }
}

export default NewUser;
