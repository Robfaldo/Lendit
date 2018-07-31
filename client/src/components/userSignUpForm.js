import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UserSignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      redirectTo: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/auth/signup', {
      username: this.state.username,
      password: this.state.password,
    })
      .then(response => {
        console.log(response);
        if(!response.data.errmsg) {
          console.log('Sign up successful');
          console.log(response.data);
          this.setState({
            redirectTo: '/'
          })
        } else {
          console.log('duplicate')
        }
      })
  };

  render() {
    if (this.state.redirectTo) {
      let redirect = this.state.redirectTo;
      this.setState({
        redirectTo: null,
      });
      return <Redirect to={{pathname: redirect }} />
    }

    return (
      <form
        id="signup-form"
        onSubmit={this.handleSubmit}
        className="sign-up-form">

        First Name <input
          id="signup-first-name"
          name="firstName"
          type="text"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.handleChange}
        /><br />

        Last Name <input
          id="signup-last-name"
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={this.handleChange}
        /><br />

        Username<input
          id="signup-username"
          name="username"
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange}
        /><br />

        Email<input
          id="signup-email"
          name="email"
          type="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
        /><br />

        Password <input
        id="signup-password"
        name="password"
        type="password"
        placeholder="Password"
        value={this.state.password}
        onChange={this.handleChange}
      />
        <button type="submit" className="SubmitButton">Sign Up </button>
      </form>
    )
  };
}

export default UserSignUpForm;
