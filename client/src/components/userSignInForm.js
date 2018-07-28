import React from 'react';

class UserSignInForm extends React.Component {
  render() {
    return (
      <form id="signin-form" onSubmit={this.props.handleSubmit} className="sign-in-form">
        <input id="signin-username" type="text" placeholder="Username"/>
        <input id="signin-password" type="password" placeholder="Password"/>
      </form>
    )
  }
}

export default UserSignInForm;
