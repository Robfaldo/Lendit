import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UserSignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirectTo: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/auth/signup', {
      username: event.target.username.value,
      password: event.target.password.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value
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
      <div class="row" style={{width: "50%"}}>
        <form class="col s12" id="signup-form" onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="input-field col s6">
              <input
                placeholder="First Name"
                name="firstName"
                id="first_name"
                type="text"
                class="validate"/>
            </div>
            <div class="input-field col s6">
              <input
                placeholder="Last Name"
                id="last_name"
                name="lastName"
                type="text"
                class="validate"/>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="Username"
                id="signup-username"
                type="text"
                name="username"
                class="validate"/>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                class="validate"/>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="Email"
                id="email"
                type="email"
                class="validate"/>
            </div>
          </div>
          <button type="submit" class="waves-effect waves-light btn">Sign Up </button>
        </form>
      </div>
      // <form
      //   id="signup-form"
      //   onSubmit={this.handleSubmit}
      //   className="sign-up-form">
      //
      //   First Name <input
      //     id="signup-first-name"
      //     name="firstName"
      //     type="text"
      //     placeholder="First Name"
      //   /><br />
      //
      //   Last Name <input
      //     id="signup-last-name"
      //     name="lastName"
      //     type="text"
      //     placeholder="Last Name"
      //   /><br />
      //
      //   Username<input
      //     id="signup-username"
      //     name="username"
      //     type="text"
      //     placeholder="Username"
      //   /><br />
      //
      //   Email<input
      //     id="signup-email"
      //     name="email"
      //     type="email"
      //     placeholder="Email"
      //   /><br />
      //
      //   Password <input
      //   id="signup-password"
      //   name="password"
      //   type="password"
      //   placeholder="Password"
      // />
      //   <button type="submit" className="SubmitButton">Sign Up </button>
      // </form>
    )
  };
}

export default UserSignUpForm;
