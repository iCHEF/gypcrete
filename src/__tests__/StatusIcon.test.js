import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Icon from '../Icon';
import StatusIcon from '../StatusIcon';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <StatusIcon status="loading" />;

    ReactDOM.render(element, div);
});

it('renders nothing if status not recognized', () => {
    const wrapper = shallow(<StatusIcon status="foo-bar" />);
    expect(wrapper.children()).toHaveLength(0);
});

it('renders success icon', () => {
    const wrapper = shallow(<StatusIcon status="success" />);
    expect(wrapper.find(Icon).prop('type')).toBe('inline-success');
});

it('renders loading icon', () => {
    const wrapper = shallow(<StatusIcon status="loading" />);
    expect(wrapper.find(Icon).prop('type')).toBe('inline-loading');
});

it('renders error icon', () => {
    const wrapper = shallow(<StatusIcon status="error" />);
    expect(wrapper.find(Icon).prop('type')).toBe('inline-error');
});
