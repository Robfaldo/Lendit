import React from 'react';

function UserSignUpForm(props) {
  return (
    <form
      id="signup-form"
      onSubmit={props.handleSubmit}
      className="sign-up-form">

      First Name <input
        id="signup-first-name"
        name="firstName"
        type="text"
        placeholder="First Name"
      /><br />

      Last Name <input
        id="signup-last-name"
        name="lastName"
        type="text"
        placeholder="Last Name"
      /><br />

      Username<input
        id="signup-username"
        name="username"
        type="text"
        placeholder="Username"
      /><br />

      Email<input
        id="signup-email"
        name="email"
        type="email"
        placeholder="Email"
      /><br />

      Password <input
      id="signup-password"
      name="password"
      type="password"
      placeholder="Password"
    />
      <button type="submit" className="SubmitButton">Sign Up </button>
    </form>
  )
}

export default UserSignUpForm;
