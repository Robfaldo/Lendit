import React from 'react';

class UserSignUpForm extends React.Component {
  render() {
    return (
      <form id="signup-form" onSubmit={this.props.handleSubmit} className="sign-up-form">
        <input id="signup-first-name" type="text" placeholder="First Name"/>
        <input id="signup-last-name" type="text" placeholder="Last Name"/>
        <input id="signup-username" type="text" placeholder="Username"/>
        <input id="signup-email" type="email" placeholder="Email" />
        <input id="signup-password" type="password" placeholder="Password" />
        <input id="signup-password-confirm" type="password" placeholder="Confirm password" />
        <button type="submit" className="SubmitButton">Sign Up </button>
      </form>
    )
  };
}

export default UserSignUpForm;
