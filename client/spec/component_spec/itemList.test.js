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

  it('the <ul> should contain three Item Components', () => {
    expect(itemList.find('Item').length).toEqual(3);
  })

  it('the Items should have the right props', () => {
    let item1 = toJSON(itemList.find('Item'))[0].props.itemName;
    let item2 = toJSON(itemList.find('Item'))[1].props.itemName;
    let item3 = toJSON(itemList.find('Item'))[2].props.itemName;
    expect(item1).toBe('ostrich egg');
    expect(item2).toBe('iPhone charger cable');
    expect(item3).toBe('neon green hair tie');
  })
})
