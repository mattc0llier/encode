import React from 'react';
import { Link } from 'react-router-dom';
  
class Settings extends React.Component {
  constructor(){
    super();

    this.state = { profilePicture: "", bio: "", location: ""}

    this.handleProfilePictureChange = this.handleProfilePictureChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleUpdateSettingsSubmit = this.handleUpdateSettingsSubmit.bind(this);
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
      location: event.target.value
    })
  }

  handleUpdateSettingsSubmit(event){
    event.preventDefault();
    const updatedInfo = {
      profilePicture: this.state.profilePicture,
      bio: this.state.bio,
      location: this.state.location
    }
    console.log('updated user info', updatedInfo);
  }

  render(){
    return(
      <div className="settings">
        <h3>Your settings</h3>
        <Link to='/logout'><p>Log out</p></Link>

        <form  onSubmit={this.handleUpdateSettingsSubmit}>
          <input className="settings__input" onChange={this.handleProfilePictureChange} placeholder="profile picture url" />
          <input className="settings__input" onChange={this.handleBioChange} placeholder="your bio" />
          <input className="settings__input" onChange={this.handleLocationChange} placeholder="area or town you live in" />
          <button type="submit" className="settings__button">Save</button>
        </form>
      </div>
    )
  }
}

export default Settings;
