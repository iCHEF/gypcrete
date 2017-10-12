import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import TextInput, { BEM } from '../TextInput';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <TextInput
            label="foo"
            defaultValue="bar" />
    );

    ReactDOM.render(element, div);
});

it('renders an <input> inside', () => {
    const wrapper = mount(<TextInput label="foo" defaultValue="bar" />);

    expect(wrapper.find('input').exists()).toBeTruthy();
});

it('enters and leaves focused state on input events', () => {
    const focusedModifier = BEM.root
        .modifier('focused')
        .toString({ stripBlock: true });

    const wrapper = mount(<TextInput label="foo" defaultValue="bar" />);
    expect(wrapper.state('focused')).toBeFalsy();

    wrapper.find('input').simulate('focus');
    expect(wrapper.state('focused')).toBeTruthy();
    expect(wrapper.hasClass(focusedModifier)).toBeTruthy();

    wrapper.find('input').simulate('blur');
    expect(wrapper.state('focused')).toBeFalsy();
    expect(wrapper.hasClass(focusedModifier)).toBeFalsy();
});

it('has ineditable modifier if input disabled or readOnly', () => {
    const ineditableModifier = BEM.root
        .modifier('ineditable')
        .toString({ stripBlock: true });

    const wrapper = mount(<TextInput label="foo" defaultValue="bar" />);
    expect(wrapper.hasClass(ineditableModifier)).toBeFalsy();

    wrapper.setProps({ disabled: true, readOnly: false });
    expect(wrapper.hasClass(ineditableModifier)).toBeTruthy();
});
