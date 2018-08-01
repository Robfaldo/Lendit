import React from 'react';
import MyAvailableItems from '../components/myAvailableItems';

function Profile(props) {
  return (
    <div>
      <h1>Welcome, {props.userDetails.username}!</h1>
      <p>You have {props.userDetails.karmaPoints} karma points</p>
      <p>This is where the profile picture will go</p>
      <MyAvailableItems itemsData={props.itemsData} userDetails={props.userDetails} />
    </div>
  )
}

export default Profile;
