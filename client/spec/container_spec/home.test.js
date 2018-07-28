import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../src/containers/home';

Enzyme.configure({adapter: new Adapter()});
const home = Enzyme.shallow(
  <Home />
);

describe('Home', () => {
  it('has a sign in component', () => {
    expect((home).find('UserSignInForm').length).toEqual(1);
  })

  it('has a sign up component', () => {
    expect(home.find('UserSignUpForm').length).toEqual(1);
  })
})
