import React from 'react';

class UserSignUpForm extends React.Component {
  render() {
    return (
      <div>
        <input id="signup-first-name" type="text" placeholder="First Name"/>
        <input id="signup-last-name" type="text" placeholder="Last Name"/>
        <input id="signup-username" type="text" placeholder="Username"/>

      </div>
    )
  };
}

export default UserSignUpForm;
