import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ItemList from '../src/itemList';

Enzyme.configure({adapter: new Adapter()});

describe('itemList', () => {
  it('is an unordered list', () => {
    const itemList = Enzyme.shallow(<ItemList />);
    expect(itemList.find('ul').length).toBe(1);
  })
})
