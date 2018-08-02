import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../src/containers/home';

Enzyme.configure({adapter: new Adapter()});
const mockSignUpSubmit = jest.fn();
const mockSignInSubmit = jest.fn();
const home = Enzyme.shallow(
  <Home handleSignUpSubmit={mockSignUpSubmit} handleSignInSubmit={mockSignInSubmit}/>
);

describe('Home', () => {
  it('has a homepage title component', () => {
    expect(home.find('HomepageTitle').length).toEqual(1);
  })

  it('has a homepage display component', () => {
    expect((home).find('HomepageDisplay').length).toEqual(1);
  })

  it('has a homepage display toggle component', () => {
    expect(home.find('HomepageDisplayToggle').length).toEqual(1);
  })
})
