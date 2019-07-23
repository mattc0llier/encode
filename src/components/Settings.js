import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Settings extends React.Component {
  constructor(){
    super();

    this.state = { profilePicture: "", bio: "", location: "", redirect: ""}

    this.handleProfilePictureChange = this.handleProfilePictureChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleUpdateSettingsSubmit = this.handleUpdateSettingsSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    this.props.receiveLoggedOutUser()
    this.setState({
      redirect: 'logout'
    })
  }

  handleProfilePictureChange(event){
    this.setState({
      profilePicture: event.target.value
    })
  }
  handleBioChange(event){
    this.setState({
      bio: event.target.value
    })
  }
  handleLocationChange(event){
    this.setState({
      location: event.target.value,
    })
  }

  updateUserSettings(updatedInfo){
    return fetch(`/api/users/${this.props.currentUser.user_id}/update`, {
      method: 'PATCH',
      body: JSON.stringify({
        updatedInfo: updatedInfo
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(body => {
        console.log('updated settings', body);
    })
    .catch(error => console.log(error.message));
  }

  handleUpdateSettingsSubmit(event){
    event.preventDefault();
    const updatedInfo = {
      profilePicture: this.state.profilePicture,
      bio: this.state.bio,
      location: this.state.location
    }
    console.log('updated user info', updatedInfo);
    this.updateUserSettings(updatedInfo)
    this.setState({
      redirect: 'profile'
    })
  }

  fetchCurrentUserSettings(){
    fetch(`/api/users/${this.props.currentUser.user_id}/settings`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      console.log(body);
      this.setState({
        profilePicture: body.photo,
        bio: body.bio,
        location: body.location
      })
    })
    .catch(error => console.log(error.message));
  }

  componentDidMount(){
    this.fetchCurrentUserSettings()
  }

  render(){
    if (this.state.redirect == 'profile') {
      return(<Redirect to={`/users/${this.props.currentUser.username}`} />)
    } else if (this.state.redirect == 'logout') {
      return(<Redirect to={`/login`} />)
    } else {
      return(
      <div className="form-center" >
        <div className="settings">
          <button className="logout" onClick={this.handleLogout}>Log out</button>
          <h3>Your settings</h3>
          <form  onSubmit={this.handleUpdateSettingsSubmit}>
            <label for="photo">Profile picture url</label>
            <input name="photo" type="url" className="settings__input" onChange={this.handleProfilePictureChange} placeholder={this.state.profilePicture ? this.state.profilePicture : "profile picture url"} />
            <label for="first-name">Bio</label>
            <input name="first-name" type="text" className="settings__input" onChange={this.handleBioChange} placeholder={this.state.bio ? this.state.bio : "your bio (char limit 255)"} />
            <label for="first-name">Your location</label>
            <input name="first-name" type="text" className="settings__input" onChange={this.handleLocationChange} placeholder={this.state.location ? this.state.location : "area or town you live in"} />
            <button type="submit" className="settings__button">Save</button>
          </form>
        </div>
      </div>
      )
    }
  }
}

export default Settings;
