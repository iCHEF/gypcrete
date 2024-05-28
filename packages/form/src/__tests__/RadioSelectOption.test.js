import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

import { Radio } from '@ichef/gypcrete';
import RadioSelectOption from '../RadioSelectOption';

it('renders without crashing', () => {
  const element = (
    <RadioSelectOption
      label="foo"
      value="bar"
    />
  );

  render(element);
});

it('renders <Radio> inside', () => {
  const wrapper = mount(
    <RadioSelectOption
      label="foo"
      value="bar"
      checked
      readOnly
    />,
  );

  expect(wrapper.find(Radio).props()).toMatchObject({
    basic: 'foo',
    checked: true,
    disabled: true,
  });
});

it('passes new checked state via onChange()', () => {
  const handleChange = jest.fn();
  const wrapper = mount(
    <RadioSelectOption
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
    <RadioSelectOption
      label="foo"
      value="bar"
    />,
  );

  wrapper.find('input').simulate('change', { target: { checked: true } });
});

it('accepts unknown props and passes to <Radio> inside', () => {
  const wrapper = mount(
    <RadioSelectOption
      label="foo"
      value="bar"
      bold
    />,
  );
  expect(wrapper.find(Radio).prop('bold')).toBeTruthy();
});
