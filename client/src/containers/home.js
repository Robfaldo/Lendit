import React from 'react';
import UserSignInForm from '../../src/components/userSignInForm';
import UserSignUpForm from '../../src/components/userSignUpForm';


class Home extends React.Component {

  render() {

    return (
      <div>
        <UserSignInForm handleSubmit={this.props.handleSubmit}/>
        <UserSignUpForm />
      </div>
    )
  }
}

export default Home;
