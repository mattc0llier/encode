import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class NewUser extends React.Component {
  constructor(){
    super();

    this.state = { newUser: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: ""
    },
    redirect: false
  }

    this.handleCreateFirstNameChange = this.handleCreateFirstNameChange.bind(this)
    this.handleCreateLastNameChange = this.handleCreateLastNameChange.bind(this)
    this.handleCreateUsernameChange = this.handleCreateUsernameChange.bind(this)
    this.handleCreateEmailChange = this.handleCreateEmailChange.bind(this)
    this.handleCreatePasswordChange = this.handleCreatePasswordChange.bind(this)
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this)
  }

  handleCreateFirstNameChange(event){
    this.setState({
      newUser: {
        first_name: event.target.value,
        last_name: this.state.newUser.last_name,
        username: this.state.newUser.email,
        email: this.state.newUser.email,
        password: this.state.newUser.password
      }
    })
  }
  handleCreateLastNameChange(event){
    this.setState({
      newUser: {
        first_name: this.state.newUser.first_name,
        last_name: event.target.value,
        username: event.target.value,
        email: this.state.newUser.email,
        password: this.state.newUser.password
      }
    })
  }
  handleCreateUsernameChange(event){
    this.setState({
      newUser: {
        first_name: this.state.newUser.first_name,
        last_name: this.state.newUser.last_name,
        username: event.target.value,
        email: this.state.newUser.email,
        password: this.state.newUser.password
      }
    })
  }
  handleCreateEmailChange(event){
    this.setState({
      newUser: {
        first_name: this.state.newUser.first_name,
        last_name: this.state.newUser.last_name,
        username: this.state.newUser.username,
        email: event.target.value,
        password: this.state.newUser.password
      }
    })
  }
  handleCreatePasswordChange(event){
    this.setState({
      newUser: {
        first_name: this.state.newUser.first_name,
        last_name: this.state.newUser.last_name,
        username: this.state.newUser.username,
        email: this.state.newUser.email,
        password: event.target.value
      }
    })
  }

  handleCreateUserSubmit(event){
    event.preventDefault();
    this.props.receiveNewUser(this.state.newUser)
    this.setState({
      redirect: true
    })
  }


  render(){

      if (this.state.redirect) return(<Redirect to='/start' />)
       else return(
        <div className="newUser">
          <h2>Learn with us</h2>
          <form  onSubmit={this.handleCreateUserSubmit}>
            <input className="newUser__input" onChange={this.handleCreateFirstNameChange} placeholder="first name" />
            <input className="newUser__input" onChange={this.handleCreateLastNameChange} placeholder="last name" />
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
