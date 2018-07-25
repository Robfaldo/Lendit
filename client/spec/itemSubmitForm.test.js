import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ItemSubmitForm from '../src/itemSubmitForm';

Enzyme.configure({adapter: new Adapter()});

const mockClick = jest.fn();
const itemSubmitForm = Enzyme.shallow(<ItemSubmitForm handleClick={mockClick} />);

test('renders a text field', () => {
  expect(itemSubmitForm.find('textarea').length).toEqual(1);
})

test('renders a button', () => {
  expect(itemSubmitForm.find('button').length).toEqual(1);
})

test('button handles clicks properly', () => {
  itemSubmitForm.find('button').simulate('click');
  expect(mockClick.mock.calls.length).toEqual(1);
})
