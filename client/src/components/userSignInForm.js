import React from 'react';

class UserSignInForm extends React.Component {
  render() {
    return (
      <form
        id="signin-form"
        onSubmit={this.props.handleSubmit}
        className="signin-form">
        Username: <input
          id="signin-username"
          name="username"
          type="text"
          placeholder="Username"
        /><br />
        Password: <input
        id="signin-password"
        name="password"
        type="password"
        placeholder="Password"
      /><br />
        <button type="submit" className="SubmitButton">Sign In</button>
      </form>
    )
  }
}

export default UserSignInForm;
