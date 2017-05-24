import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import keycode from 'keycode';

import EditableText, { PureEditableText } from '../EditableText';
import { PureText } from '../Text';

function delayForMilliseconds(millisecond) {
    return new Promise(resolve => setTimeout(resolve, millisecond));
}

describe('withStatus(EditableText)', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = <EditableText />;

        ReactDOM.render(element, div);
    });
});

describe('pure <PureEditableText>', () => {
    it('renders an <input type="text"> inside <BasicRow>', () => {
        const wrapper = mount(<PureEditableText />);

        expect(
            wrapper.find('BasicRow').containsMatchingElement(<input type="text" />)
        ).toBeTruthy();
    });

    it('renders basic label with placeholder if <input> has no value', () => {
        const wrapper = mount(<PureEditableText placeholder="FooBar Placeholder" />);
        expect(wrapper.find('BasicRow').text()).toBe('FooBar Placeholder');
    });

    it('renders basic label with the value from <input>', () => {
        const wrapper = mount(<PureEditableText value="Foo" />);
        expect(wrapper.find('BasicRow').text()).toBe('Foo');

        wrapper.setProps({ value: 'Bar' });
        expect(wrapper.find('BasicRow').text()).toBe('Bar');
    });

    it('enters focused mode when <input> is focused.', () => {
        const wrapper = mount(<PureEditableText />);
        expect(wrapper.state('focused')).toBeFalsy();
        expect(wrapper.hasClass('gyp-editable-text--focused')).toBeFalsy();

        wrapper.find('input').simulate('focus');
        expect(wrapper.state('focused')).toBeTruthy();
        expect(wrapper.hasClass('gyp-editable-text--focused')).toBeTruthy();

        wrapper.find('input').simulate('blur');
        expect(wrapper.state('focused')).toBeFalsy();
        expect(wrapper.hasClass('gyp-editable-text--focused')).toBeFalsy();
    });

    it('renders without status elements in focused mode', () => {
        const wrapper = shallow(
            <PureEditableText
                statusIcon={<span data-icon />}
                errorMsg="Foo-Bar" />
        );

        expect(wrapper.prop('statusIcon')).toEqual(<span data-icon />);
        expect(wrapper.prop('errorMsg')).toBe('Foo-Bar');

        wrapper.setState({ focused: true });
        expect(wrapper.prop('statusIcon')).toBe(PureText.defaultProps.statusIcon);
        expect(wrapper.prop('errorMsg')).toBe(PureText.defaultProps.errorMsg);
    });

    it('works like a controlled input when given "value" prop', () => {
        const wrapper = mount(<PureEditableText value="Foo" />);
        const input = wrapper.find('input');

        expect(input.prop('value')).toBe('Foo');

        input.simulate('change', {
            target: { value: 'Bar' },
        });
        expect(input.prop('value')).toBe('Foo');
    });

    it('works like an uncontrolled input when not given "value" prop', () => {
        const wrapper = mount(<PureEditableText />);
        const input = wrapper.find('input');

        expect(input.prop('value')).toBe('');

        input.simulate('change', {
            target: { value: 'Bar' },
        });
        expect(input.prop('value')).toBe('Bar');
    });

    it('does not clear cached input value when goes from controlled input to uncontrolled', () => {
        const wrapper = mount(<PureEditableText value="Foo" />);
        const input = wrapper.find('input');

        expect(input.prop('value')).toBe('Foo');

        wrapper.setProps({ value: null });
        expect(input.prop('value')).toBe('Foo');
    });

    it('can have a default value', () => {
        const wrapper = mount(<PureEditableText defaultValue="Foo" />);
        const input = wrapper.find('input');

        expect(input.prop('value')).toBe('Foo');

        input.simulate('change', {
            target: { value: 'Bar' },
        });
        expect(input.prop('value')).toBe('Bar');
    });

    it('notifies edit end on input blur', () => {
        const handleEditEnd = jest.fn();
        const wrapper = mount(<PureEditableText onEditEnd={handleEditEnd} />);
        const input = wrapper.find('input');

        input.simulate('blur', { target: { value: 'Foo' } });
        expect(handleEditEnd).toHaveBeenLastCalledWith({ value: 'Foo', reset: false });
    });

    it('notifies edit end on Enter key', () => {
        const handleEditEnd = jest.fn();
        const wrapper = mount(<PureEditableText onEditEnd={handleEditEnd} />);
        const input = wrapper.find('input');

        input.simulate('keydown', {
            target: { value: 'Bar' },
            keyCode: keycode('Enter'),
        });
        expect(handleEditEnd).toHaveBeenLastCalledWith({ value: 'Bar', reset: false });
        expect(handleEditEnd).toHaveBeenCalledTimes(1);
    });

    it('notifies edit end and reminds to reset on Escape key', () => {
        const handleEditEnd = jest.fn();
        const wrapper = mount(<PureEditableText onEditEnd={handleEditEnd} />);
        const input = wrapper.find('input');

        input.simulate('keydown', {
            target: { value: 'Bar' },
            keyCode: keycode('Escape'),
        });
        expect(handleEditEnd).toHaveBeenLastCalledWith({ value: 'Bar', reset: true });
        expect(handleEditEnd).toHaveBeenCalledTimes(1);
    });

    it('prevents another notifiying edit end within short time interval', async () => {
        const handleEditEnd = jest.fn();
        const wrapper = mount(<PureEditableText onEditEnd={handleEditEnd} />);
        const input = wrapper.find('input');

        input.simulate('keydown', {
            keyCode: keycode('Escape'),
        });
        expect(handleEditEnd).toHaveBeenCalledTimes(1);

        await delayForMilliseconds(100);

        input.simulate('blur');
        expect(handleEditEnd).toHaveBeenCalledTimes(1);
    });

    it('does not interupt user input on non-Enter/Esc keys', () => {
        const handleEditEnd = jest.fn();
        const wrapper = mount(<PureEditableText onEditEnd={handleEditEnd} />);
        const input = wrapper.find('input');

        input.simulate('keydown', {
            target: { value: 'Foo' },
            keyCode: keycode('B'),
        });
        expect(handleEditEnd).not.toHaveBeenCalled();
    });

    it('can manually focus its <input> on DOM', () => {
        const wrapper = mount(<PureEditableText />);
        const input = wrapper.instance().inputNode;

        const spy = jest.spyOn(input, 'focus');
        wrapper.instance().focusInputNode();

        expect(spy).toHaveBeenCalled();
    });
});
