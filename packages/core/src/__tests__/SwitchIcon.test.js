import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import SwitchIcon from '../SwitchIcon';

it('renders without crashing', () => {
  const element = <SwitchIcon />;

  render(element);
});

it('can be turned on or off', () => {
  const wrapper = shallow(<SwitchIcon state="on" />);
  expect(wrapper.hasClass('gyp-switch-icon--on')).toBeTruthy();
  expect(wrapper.hasClass('gyp-switch-icon--off')).toBeFalsy();

  wrapper.setProps({ state: 'off' });
  expect(wrapper.hasClass('gyp-switch-icon--off')).toBeTruthy();
  expect(wrapper.hasClass('gyp-switch-icon--on')).toBeFalsy();
});
