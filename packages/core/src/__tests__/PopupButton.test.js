import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Button from '../Button';
import PopupButton, { COMPONENT_NAME } from '../PopupButton';

it('should render without crashing', () => {
  const element = <PopupButton />;

  render(element);
});

it('returns a pre-configured <Button> extending given props', () => {
  const wrapper = shallow(
    <PopupButton
      basic="foo"
      aside="bar"
    />,
  );
  expect(
    wrapper.matchesElement(
      <Button
        minified={false}
        align="center"
        basic="foo"
        aside="bar"
      />,
    ),
  ).toBeTruthy();
});

it('mixes className with own class name', () => {
  const wrapper = shallow(
    <PopupButton
      basic="foo"
      className="bar"
    />,
  );

  expect(wrapper.hasClass(COMPONENT_NAME));
  expect(wrapper.hasClass('bar'));
});
