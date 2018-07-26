import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Item from '../src/components/item';

Enzyme.configure({adapter: new Adapter()});

const item = Enzyme.shallow(<Item itemName={'ostrich egg'}/>)

test('Item renders a <li>', () => {
  expect(item.find('li').length).toEqual(1);
})

test('The <li> element contains the right text', () => {
  expect(item.find('li').text()).toEqual('ostrich egg');
})
