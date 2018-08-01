import React from 'react';

function Profile(props) {
  return (
    <div>
      <h1>Welcome, {props.userDetails.username}!</h1>
      <p>You have {props.userDetails.karmaPoints} karma points</p>
      <p>This is where the profile picture will go</p>
    </div>
  )
}

export default Profile;
