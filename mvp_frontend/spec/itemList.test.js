import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ItemList from '../src/itemList';
const axios = require('axios');

jest.mock('axios');
Enzyme.configure({adapter: new Adapter()});

describe('itemList', () => {
  it('is an unordered list', () => {
    const itemList = Enzyme.shallow(<ItemList />);
    expect(itemList.find('ul').length).toBe(1);
  })

  it('renders three <li> items', () => {
    const data = ['scissors', 'screwdriver', 'goat']
    const itemList = Enzyme.shallow(<ItemList itemData={data}/>);
    expect(itemList.find('li').length).toBe(3);
  })
})
