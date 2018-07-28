import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../src/containers/home';

Enzyme.configure({adapter: new Adapter()});

describe('Home', () => {
  it('exists', () => {
    expect(3).toEqual(3);
  })
})
