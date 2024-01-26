import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import Overlay from '../Overlay';

const bodyClassList = document.body.classList;

it('renders without crashing', () => {
  const element = <Overlay />;

  render(element);
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
