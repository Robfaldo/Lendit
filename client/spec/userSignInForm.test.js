import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserSignInForm from '../src/components/userSignInForm';

Enzyme.configure({adapter: new Adapter()});

const signInForm = Enzyme.shallow(
  <UserSignInForm />
);

describe('SignInForm', () => {
  it('should exist', () => {
    expect(42).toEqual(42);
  })
})
