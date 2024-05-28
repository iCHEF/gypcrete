import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import { Checkbox } from '@ichef/gypcrete';
import SelectOption from '../SelectOption';

it('renders without crashing', () => {
  const element = (
    <SelectOption
      label="foo"
      value="bar"
    />
  );

  render(element);
});

it('renders <Checkbox> inside', () => {
  const wrapper = mount(
    <SelectOption
      label="foo"
      value="bar"
      checked
      readOnly
    />,
  );

  expect(wrapper.find(Checkbox).props()).toMatchObject({
    basic: 'foo',
    checked: true,
    disabled: true,
  });
});

it('passes new checked state via onChange()', () => {
  const handleChange = jest.fn();
  const wrapper = mount(
    <SelectOption
      label="foo"
      value="bar"
      onChange={handleChange}
    />,
  );

  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(handleChange).toHaveBeenLastCalledWith('bar', true);
});

it('does not break when without explicit onChange', () => {
  const wrapper = mount(
    <SelectOption
      label="foo"
      value="bar"
    />,
  );

  wrapper.find('input').simulate('change', { target: { checked: true } });
});

it('accepts unknown props and passes to <Checkbox> inside', () => {
  const wrapper = mount(
    <SelectOption
      label="foo"
      value="bar"
      bold
    />,
  );
  expect(wrapper.find(Checkbox).prop('bold')).toBeTruthy();
});
