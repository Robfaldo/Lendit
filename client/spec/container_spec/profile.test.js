import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Profile from '../../src/containers/profile';

Enzyme.configure({adapter: new Adapter()});
const mockItemsData = {};
const mockSubmit = {};
const profile = Enzyme.shallow(
  <Profile itemListData={mockItemsData} handleItemFormSubmit={mockSubmit} />
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

  describe('handling passing on of props', () => {
    it('data for itemList is passed on as prop', () => {
      expect(profile.find('ItemList').props().itemsData)
        .toBe(mockItemsData);
    })

    it('onSubmit for itemSubmitForm is passed on as prop', () => {
      expect(profile.find('ItemSubmitForm').props().onSubmit)
        .toBe(mockSubmit);
    })
  })
})
