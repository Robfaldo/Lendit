import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Profile from '../../src/containers/profile';

Enzyme.configure({adapter: new Adapter()});
const profile = Enzyme.shallow(
  <Profile />
);

describe('Profile', () => {
  describe('subordinate components', () => {
    it('has an itemList component', () => {
      expect(profile.find('ItemList').length).toEqual(1);
    })

    it('has an item submit form', () => {
      expect(profile.find('ItemSubmitForm').length).toEqual(1);
    })
  })

  describe('handling form submissions', () => {
    it('nothing here yet', () => {
      expect(42).toBe(42);
    })
  })
})
