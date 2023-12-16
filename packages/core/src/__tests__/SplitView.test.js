import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import SplitView, { BEM } from '../SplitView';

it('renders without crashing', () => {
  const element = <SplitView />;

  render(element);
});

it('renders with BEM class as column of <SplitView>', () => {
  const wrapper = shallow(<SplitView />);

  expect(wrapper.hasClass(BEM.root.toString())).toBeTruthy();
});
