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

it('hides success icon after 2 secs', () => {
    jest.useFakeTimers();

    const wrapper = shallow(<StatusIcon status="success" />);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout.mock.calls[0][1]).toBe(2000);
    expect(wrapper.find(Icon).prop('type')).toBe('inline-success');

    jest.runAllTimers();

    expect(wrapper.state('hideIcon')).toBeTruthy();
    expect(wrapper.find(Icon).exists()).toBeFalsy();
});

it('should clear auto-hide timeout on unmount', () => {
    jest.useFakeTimers();

    const wrapper = shallow(<StatusIcon status="success" />);
    jest.runAllTimers();
    wrapper.unmount();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
});

it('should restore hidden icon when status changes', () => {
    jest.useFakeTimers();

    const wrapper = shallow(<StatusIcon status="success" />);
    jest.runAllTimers();

    wrapper.setProps({ status: 'loading' });

    expect(wrapper.state('hideIcon')).toBeFalsy();
    expect(wrapper.instance().autoHideTimeout).toBeNull();
});

it('should restore hidden icon when autohide changed to false', () => {
    jest.useFakeTimers();

    const wrapper = shallow(<StatusIcon status="success" />);
    jest.runAllTimers();

    wrapper.setProps({ autohide: false });

    expect(wrapper.state('hideIcon')).toBeFalsy();
    expect(wrapper.instance().autoHideTimeout).toBeNull();
});

it('should ignore to hide icon if autohide is false', () => {
    jest.useFakeTimers();
    shallow(<StatusIcon status="success" autohide={false} />);

    expect(setTimeout).toHaveBeenCalledTimes(0);
});
