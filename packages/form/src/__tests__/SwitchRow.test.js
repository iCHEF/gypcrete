import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import { Switch, TextLabel } from '@ichef/gypcrete';
import SwitchRow, { PureSwitchRow } from '../SwitchRow';

describe('formRow(SwitchRow)', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
      <SwitchRow label="foo" />
    );

    ReactDOM.render(element, div);
  });
});

describe('Pure <SwitchRow>', () => {
  it('renders a <Switch> from @ichef/gypcrete with all unknown props', () => {
    const wrapper = mount(
      <PureSwitchRow
        label="foo"
        tabIndex="-1"
        data-foo="bar" />
    );

    expect(wrapper.find(Switch).exists()).toBeTruthy();
    expect(wrapper.find(Switch).props()).not.toHaveProperty('label');
    expect(wrapper.find(Switch).props()).toMatchObject({
      tabIndex: '-1',
      'data-foo': 'bar',
    });
  });

  it('observes checked state of inner <Switch> and cache in state', () => {
    // Default Switch
    let wrapper = mount(<PureSwitchRow label="foo" />);
    expect(wrapper.state('checked')).toBeFalsy();

    // Uncontrolled Switch
    wrapper = mount(<PureSwitchRow label="foo" defaultChecked />);
    expect(wrapper.state('checked')).toBeTruthy();

    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(wrapper.state('checked')).toBeFalsy();

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(wrapper.state('checked')).toBeTruthy();

    // Controller Switch
    wrapper = mount(<PureSwitchRow label="foo" checked />);
    expect(wrapper.state('checked')).toBeTruthy();

    wrapper.setProps({ checked: false });
    expect(wrapper.state('checked')).toBeFalsy();

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(wrapper.state('checked')).toBeFalsy();
  });

  it('shows different basic with checked state', () => {
    const wrapper = shallow(
      <PureSwitchRow
        checked
        label="foo"
        asideOn="TEST_ON"
        asideOff="TEST_OFF" />
    );

    expect(wrapper.find(TextLabel).prop('basic')).toBe('TEST_ON');

    wrapper.setProps({ checked: false });
    expect(wrapper.find(TextLabel).prop('basic')).toBe('TEST_OFF');
  });

  it('accepts additional children', () => {
    const wrapper = mount(
      <PureSwitchRow label="foo">
        <span data-foo />
      </PureSwitchRow>
    );

    expect(wrapper.containsMatchingElement(<span data-foo />)).toBeTruthy();
  });
});
