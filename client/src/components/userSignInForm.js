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
      <div class="row" style={{width: "50%"}}>
        <form class="col s12" id="signin-form" onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="Username"
                id="signin-username"
                type="text"
                name="username"
                class="validate"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                class="validate"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit" class="waves-effect waves-light btn">Sign In </button>
        </form>
      </div>
    )
  }
}

export default UserSignInForm;
