import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import SplitViewColumn from '../SplitViewColumn';
import { BEM } from '../SplitView';

it('renders without crashing', () => {
  const element = <SplitViewColumn />;

  render(element);
});

it('renders with BEM class as column of <SplitView>', () => {
  const wrapper = shallow(<SplitViewColumn />);

  expect(wrapper.hasClass(BEM.column.toString())).toBeTruthy();
});

it('adds wide modifier to class names when specified', () => {
  const wrapper = shallow(<SplitViewColumn wide />);
  const expectedClassName = BEM.column
    .modifier('wide')
    .toString({ stripBlock: true });

  expect(wrapper.hasClass(expectedClassName)).toBeTruthy();
});
