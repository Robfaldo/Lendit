import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserSignInForm from '../src/components/userSignInForm';

Enzyme.configure({adapter: new Adapter()});

const signInForm = Enzyme.shallow(
  <UserSignInForm />
);

describe('SignInForm', () => {
  it('has a username field', () => {
    expect((signInForm).find('#signin-username').length).toEqual(1);
  })

  it('has a password field', () => {
    expect((signInForm).find('#signin-password').length).toEqual(1);
  })
})
