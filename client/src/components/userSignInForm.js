import React from 'react';

class UserSignInForm extends React.Component {
  render() {
    return (
      <div>
        <input id="signin-username" type="text" placeholder="Username"/>
        <input id="signin-password" type="password" placeholder="Password"/>
      </div>
    )
  }
}

export default UserSignInForm;
