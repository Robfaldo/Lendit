import React from 'react';
import UserSignInForm from './userSignInForm';
import UserSignUpForm from './userSignUpForm';
import About from './about';

function HomepageDisplay(props) {
  if (props.displayToggleState === 'sign-up') {
    return <UserSignUpForm />
  }
  else if (props.displayToggleState === 'sign-in') {
    return <UserSignInForm handleSubmit={props.handleSignInSubmit} />
  }
  else if (props.displayToggleState === 'about') {
    return <About />
  }
}

export default HomepageDisplay;
