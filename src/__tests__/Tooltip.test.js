import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Tooltip from '../Tooltip';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <Tooltip>Content</Tooltip>;

    ReactDOM.render(element, div);
});

it('can be placed top or bottom', () => {
    let wrapper = shallow(<Tooltip placement="top">Content</Tooltip>);
    expect(wrapper.hasClass('gyp-tooltip--top')).toBeTruthy();

    wrapper = shallow(<Tooltip placement="bottom">Content</Tooltip>);
    expect(wrapper.hasClass('gyp-tooltip--bottom')).toBeTruthy();
});
