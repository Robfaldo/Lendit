import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../src/containers/home';

Enzyme.configure({adapter: new Adapter()});
const mockSignUpSubmit = jest.fn();
const home = Enzyme.shallow(
  <Home handleSignUpSubmit={mockSignUpSubmit} />
);

describe('Home', () => {
  describe('subordinate components', () => {
    it('has a sign up component', () => {
      expect(home.find('UserSignUpForm').length).toEqual(1);
    })

    it('has a sign in component', () => {
      expect((home).find('UserSignInForm').length).toEqual(1);
    })
  })

  describe('handling form submissions', () => {
    it('sign up form submission callback is passed on as a prop', () => {
      expect(home.find('UserSignUpForm').props().handleSubmit)
        .toBe(mockSignUpSubmit);
    })
  })
})
