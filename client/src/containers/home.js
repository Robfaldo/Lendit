import React from 'react';
import UserSignInForm from '../../src/components/userSignInForm';
import UserSignUpForm from '../../src/components/userSignUpForm';


function Home(props) {
  return (
    <div>
      <UserSignInForm handleSubmit={props.handleSignInSubmit}/>
      <UserSignUpForm handleSubmit={props.handleSignUpSubmit}/>
    </div>
  )
}

export default Home;
