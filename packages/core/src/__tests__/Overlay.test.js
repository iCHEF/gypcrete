import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Overlay from '../Overlay';

const bodyClassList = document.body.classList;

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <Overlay />;

  ReactDOM.render(element, div);
});

it('should add "has-overlay" className on body when mounted', () => {
  mount(<Overlay />);

  expect(bodyClassList.contains('gyp-has-overlay')).toBeTruthy();
});

it('should remove "has-overlay" className on body before unmount', () => {
  const wrapper = mount(<Overlay />);

  wrapper.unmount();
  expect(bodyClassList.contains('gyp-has-overlay')).toBeFalsy();
});
