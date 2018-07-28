import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserSignInForm from '../src/components/userSignInForm';

Enzyme.configure({adapter: new Adapter()});

const mockSubmit = jest.fn();
const signInForm = Enzyme.shallow(
  <UserSignInForm handleSubmit={mockSubmit} />
);

describe('SignInForm', () => {
  describe('html elements', () => {
    it('has a sign in form', () => {
      expect((signInForm).find('#signin-form').length).toEqual(1);
    })

    it('has a username field', () => {
      expect((signInForm).find('#signin-username').length).toEqual(1);
    })

    it('has a password field', () => {
      expect((signInForm).find('#signin-password').length).toEqual(1);
    })
  })

  describe('submit action', () => {
    it('calls the handleSubmit callback when submitted', () => {
      signInForm.find('#signin-form').simulate('submit');
      expect(mockSubmit.mock.calls.length).toEqual(1);
    })
  })
})
