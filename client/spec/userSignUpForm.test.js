import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserSignUpForm from '../src/components/userSignUpForm';

Enzyme.configure({adapter: new Adapter()});

describe('Sign up form', () => {
  it('has a first name field',() => {
    const signUpForm = Enzyme.shallow(
      <UserSignUpForm />
    );
    expect((signUpForm).find('#first-name').length).toEqual(1);
  })
})
