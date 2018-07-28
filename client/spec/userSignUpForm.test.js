import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserSignUpForm from '../src/components/userSignUpForm';

Enzyme.configure({adapter: new Adapter()});

const signUpForm = Enzyme.shallow(
  <UserSignUpForm />
);

describe('Sign up form', () => {
  it('has a sign up form', () => {
    expect((signUpForm).find('#signup-form').length).toEqual(1);
  })

  it('has a first name field',() => {
    expect((signUpForm).find('#signup-first-name').length).toEqual(1);
  })

  it('has a last name field',() => {
    expect((signUpForm).find('#signup-last-name').length).toEqual(1);
  })

  it('has a username field',() => {
    expect((signUpForm).find('#signup-username').length).toEqual(1);
  })

  it('has an email field', () => {
    expect(signUpForm.find('#signup-email').length).toEqual(1);
  })

  it('has a password field', () => {
    expect(signUpForm.find('#signup-password').length).toEqual(1);
  })

  it('has a password confirmation field', () => {
    expect(signUpForm.find('#signup-password-confirm').length).toEqual(1);
  })

})
