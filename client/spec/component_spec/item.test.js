import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Item from '../../src/components/item';

Enzyme.configure({adapter: new Adapter()});

const mockSubmit = jest.fn();
const item = Enzyme.shallow(
  <Item
    itemName={'ostrich egg'}
    itemDescription={'extremely rare'}
    itemImage={null}
  />)

describe('Item', () => {
  describe('it renders html elements', () => {
    it('Item renders a <li>', () => {
      expect(item.find('li').length).toEqual(1);
    })

    it('The <li> element contains a card', () => {
      expect(item.find('.small').length).toEqual(1);
    });
  });
});
