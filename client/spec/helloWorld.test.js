import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HelloWorld from '../src/helloWorld';

Enzyme.configure({adapter: new Adapter()});

describe('the hello-world component', () => {
  it('just renders the hello-world component', () => {
    const helloWorld = Enzyme.shallow(<HelloWorld />);
    expect(helloWorld.find('h1').text()).toEqual('Hello, world!');
  })
})
