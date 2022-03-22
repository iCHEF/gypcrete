import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Tooltip, { PureTooltip } from '../Tooltip';

describe('<Tooltip> with mixins', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <Tooltip>Content</Tooltip>;

    ReactDOM.render(element, div);
  });
});

describe('Pure <Tooltip>', () => {
  it('can be placed top or bottom', () => {
    const wrapper = shallow(<PureTooltip placement="top">Content</PureTooltip>);
    expect(wrapper.hasClass('gyp-tooltip--top')).toBeTruthy();

    wrapper.setProps({ placement: 'bottom' });
    expect(wrapper.hasClass('gyp-tooltip--bottom')).toBeTruthy();
  });
});
