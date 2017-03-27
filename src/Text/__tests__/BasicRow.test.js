import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import StatusIcon from 'src/StatusIcon';
import Tag from 'src/Tag';
import BasicRow from '../BasicRow';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <BasicRow
            basic="Basic text"
            tag="Tag"
            className="ic-text__row ic-text__basic" />
    );

    ReactDOM.render(element, div);
});

it('renders with only Basic text', () => {
    const wrapper = shallow(<BasicRow basic="foo-bar" />);
    expect(wrapper.children()).toHaveLength(1);
});

it('renders with tag', () => {
    const wrapper = shallow(<BasicRow basic="foo" tag="bar" />);
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.find(Tag).shallow().text()).toBe('bar');
});

it('renders with custom tag', () => {
    const tag = <Tag>bar</Tag>;
    const wrapper = shallow(<BasicRow basic="foo" tag={tag} />);

    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.contains(tag)).toBeTruthy();
});

it('renders with statusIcon', () => {
    const icon = <StatusIcon status="loading" />;
    const wrapper = shallow(<BasicRow basic="foo" statusIcon={icon} />);

    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.contains(icon)).toBeTruthy();
});

it('renders with both tag and statusIcon', () => {
    const icon = <StatusIcon status="loading" />;
    const wrapper = shallow(<BasicRow basic="foo" tag="bar" statusIcon={icon} />);

    expect(wrapper.children()).toHaveLength(3);
    expect(wrapper.find(Tag).shallow().text()).toBe('bar');
    expect(wrapper.contains(icon)).toBeTruthy();
});

