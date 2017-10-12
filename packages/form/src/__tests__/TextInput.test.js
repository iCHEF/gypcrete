import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import TextInput, { PureTextInput, BEM } from '../TextInput';

describe('formRow(TextInput)', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = (
            <TextInput
                label="foo"
                defaultValue="bar" />
        );

        ReactDOM.render(element, div);
    });
});

describe('Pure <TextInput>', () => {
    it('renders an <input> inside', () => {
        const wrapper = mount(
            <PureTextInput
                label="foo"
                defaultValue="bar" />
        );

        expect(wrapper.find('input').exists()).toBeTruthy();
    });

    it('enters and leaves focused state on input events', () => {
        const focusedModifier = BEM.root
            .modifier('focused')
            .toString({ stripBlock: true });

        const wrapper = mount(
            <PureTextInput
                label="foo"
                defaultValue="bar" />
        );
        expect(wrapper.state('focused')).toBeFalsy();

        wrapper.find('input').simulate('focus');
        expect(wrapper.state('focused')).toBeTruthy();
        expect(wrapper.hasClass(focusedModifier)).toBeTruthy();

        wrapper.find('input').simulate('blur');
        expect(wrapper.state('focused')).toBeFalsy();
        expect(wrapper.hasClass(focusedModifier)).toBeFalsy();
    });
});
