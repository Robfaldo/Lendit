import React from 'react';

class UserSignInForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log("function: " + this.props.handleSubmit);
    this.props.handleSubmit(this.state.username, this.state.password);
  };

  render() {
    return (
      <form
        id="signin-form"
        onSubmit={this.handleSubmit}
        className="sign-in-form">
        UserName: <input
          id="signin-username"
          name="username"
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange}
        /><br />
        Password: <input
        id="signin-password"
        name="password"
        type="password"
        placeholder="Password"
        value={this.state.password}
        onChange={this.handleChange}
      /><br />
        <button type="submit" className="SubmitButton">Sign In</button>
      </form>
    )
  }
}

export default UserSignInForm;
