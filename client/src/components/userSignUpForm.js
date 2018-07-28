import React from 'react';

class UserSignUpForm extends React.Component {
  render() {
    return (
      <div>
        <input id="first-name" type="text" placeholder="First Name"/>
        <input id="last-name" type="text" placeholder="Last Name"/>
        <input id="username" type="text" placeholder="Username"/>

      </div>
    )
  };
}

export default UserSignUpForm;
