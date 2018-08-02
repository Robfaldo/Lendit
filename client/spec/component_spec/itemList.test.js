import React from 'react';
import Enzyme from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import ItemList from '../../src/components/itemList';

Enzyme.configure({adapter: new Adapter()});

const data = [
  {_id: 'some sort of object id', itemName: 'ostrich egg'},
  {_id: 'some other object id', itemName: 'iPhone charger cable'},
  {_id: 'a third object id', itemName: 'neon green hair tie'}
];

const itemList = Enzyme.shallow(<ItemList itemsData={data} />);

describe('ItemList', () => {
  it('should render an unordered list', () => {
    expect(itemList.find('ul').length).toEqual(1);
  })
})
