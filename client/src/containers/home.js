import React from 'react';
import UserSignInForm from '../../src/components/userSignInForm';
import UserSignUpForm from '../../src/components/userSignUpForm';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <UserSignInForm handleSubmit={this.props.handleSignInSubmit}/>
        <UserSignUpForm handleSubmit={this.props.handleSignUpSubmit}/>
      </div>
    )
  }
}

export default Home;
