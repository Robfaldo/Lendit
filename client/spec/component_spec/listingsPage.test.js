import React from 'react';
import Enzyme from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import ListingsPage from '../../src/containers/listingsPage';

Enzyme.configure({adapter: new Adapter()});

describe('ListingsPage, shallow render', () => {
  const data = [
    {_id: 'some sort of object id', itemName: 'ostrich egg'},
    {_id: 'some other object id', itemName: 'iPhone charger cable'},
    {_id: 'a third object id', itemName: 'neon green hair tie'}
  ];
  const listingsPage = Enzyme.shallow(<ListingsPage data={data} />);

  it('should render the ItemSubmitForm component', () => {
    expect(listingsPage.find('ItemSubmitForm').length).toEqual(1);
  })

  it('should render the ItemList component', () => {
    expect(listingsPage.find('ItemList').length).toEqual(1);
  })
})
