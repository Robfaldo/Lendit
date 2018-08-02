import React from 'react';
import MyAvailableItems from '../components/myAvailableItems';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome, {this.props.userDetails.username}!</h1>
        <p>You have {this.props.userDetails.karmaPoints} karma points</p>
        {/* <p>This is where the profile picture will go</p>
        <MyAvailableItems itemsData={props.itemsData} userDetails={props.userDetails} /> */}
      </div>
    )
  }
}

export default Profile;
