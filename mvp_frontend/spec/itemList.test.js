import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ItemList from '../src/itemList';
const axios = require('axios');

jest.mock('axios');
Enzyme.configure({adapter: new Adapter()});

beforeAll(() => {
  const fakeResponse = {data: [
    {_id: 1, itemName: 'scissors'},
    {_id: 2, itemName: 'screwdriver'},
    {_id: 3, itemName: 'a goat'}
  ]}
  axios.get.mockResolvedValue(fakeResponse);
})

describe('itemList', () => {
  it('is an unordered list', () => {
    const itemList = Enzyme.shallow(<ItemList />);
    expect(itemList.find('ul').length).toBe(1);
  })

  it('the fake API actually works', () => {
    axios.get('this will eventually be the database URL')
      .then(res => {
        expect(res.data).toEqual(fakeResponse.data);
      })
  })
})
