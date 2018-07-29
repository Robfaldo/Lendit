import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserSignUpForm from '../../src/components/userSignUpForm';

Enzyme.configure({adapter: new Adapter()});

const mockSubmit = jest.fn();
const signUpForm = Enzyme.shallow(
  <UserSignUpForm handleSubmit={mockSubmit}/>
);

describe('Sign up form', () => {
  describe('html elements', () => {
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
  })

  // describe('submit action', () => {
  //   it('calls the handleSubmit callback when submitted', () => {
  //     signUpForm.find('#signup-form').simulate('submit');
  //     expect(mockSubmit.mock.calls.length).toEqual(1);
  //   })
  // })
})
