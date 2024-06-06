import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Checkbox, { CHECKBOX_BUTTON } from '../Checkbox';
import IconCheckbox from '../IconCheckbox';
import IconLayout from '../IconLayout';

it('renders without crashing', () => {
  const element = <IconCheckbox status="loading" />;

  render(element);
});

it('renders as a custom-configured, minified variant of <Checkbox>', () => {
  const wrapper = shallow(<IconCheckbox status="loading" />);

  expect(wrapper.find(Checkbox).exists()).toBeTruthy();
  expect(wrapper.find(Checkbox).prop('status')).toBe('loading');
  expect(wrapper.find(Checkbox).prop('minified')).toBeTruthy();
});

it('overrides checkbox button with <IconLayout>', () => {
  const wrapper = shallow(<IconCheckbox status="loading" />);

  expect(wrapper.find(Checkbox).prop('overrideButton').type).toBe(IconLayout);
  expect(wrapper.find(Checkbox).prop('overrideButton').props.icon).toBe(CHECKBOX_BUTTON);
});
