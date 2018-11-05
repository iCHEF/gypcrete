import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { ListRow } from '@ichef/gypcrete';
import TextInputRow, { PureTextInputRow, BEM } from '../TextInputRow';

/**
 * Patch `this.getInputRef` on component instance
 * so we can see if the value gets applied on lifecycle methods.
 */
class PatchedRow extends PureTextInputRow {
    getInputRef = jest.fn()
        .mockReturnValueOnce({ scrollHeight: 30 })
        .mockReturnValueOnce({ scrollHeight: 60 });
}

describe('formRow(TextInputRow)', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = (
            <TextInputRow
                label="foo"
                defaultValue="bar" />
        );

        ReactDOM.render(element, div);
    });
});

describe('Pure <TextInputRow>', () => {
    it('renders a <ListRow> to wrap everything', () => {
        const wrapper = mount(
            <PureTextInputRow
                label="foo"
                defaultValue="bar" />
        );
        expect(wrapper.children().is(ListRow));
    });

    it('renders an <input> inside with all unknown props', () => {
        const wrapper = mount(
            <PureTextInputRow
                label="foo"
                defaultValue="bar" />
        );
        expect(wrapper.find('input').exists()).toBeTruthy();

        wrapper.setProps({ id: 'foo', tabIndex: 3 });
        expect(wrapper.find('input').prop('id')).toBe('foo');
        expect(wrapper.find('input').prop('tabIndex')).toBe(3);
    });

    it('renders a <textarea> inside with unknown props under multiLine mode', () => {
        const wrapper = mount(
            <PureTextInputRow
                multiLine
                label="foo"
                defaultValue="bar" />
        );
        expect(wrapper.find('textarea').exists()).toBeTruthy();

        wrapper.setProps({ id: 'foo', tabIndex: 3 });
        expect(wrapper.find('textarea').prop('id')).toBe('foo');
        expect(wrapper.find('textarea').prop('tabIndex')).toBe(3);
    });

    it('enters and leaves focused state on input events', () => {
        const focusedModifier = BEM.root
            .modifier('focused')
            .toString({ stripBlock: true });

        const wrapper = mount(
            <PureTextInputRow
                label="foo"
                defaultValue="bar" />
        );
        expect(wrapper.state('focused')).toBeFalsy();

        wrapper.find('input').simulate('focus');
        expect(wrapper.state('focused')).toBeTruthy();
        expect(wrapper.find(ListRow).hasClass(focusedModifier)).toBeTruthy();

        wrapper.find('input').simulate('blur');
        expect(wrapper.state('focused')).toBeFalsy();
        expect(wrapper.find(ListRow).hasClass(focusedModifier)).toBeFalsy();
    });

    it('auto-grows on mount, on focus and on change under multiLine mode', () => {
        const uncontrolledWrapper = mount(
            <PatchedRow
                multiLine
                label="foo"
                defaultValue="bar" />
        );

        // componentDidMount()
        expect(uncontrolledWrapper.find('textarea').prop('style')).toEqual({ height: 30 });

        // handleInputFocus()
        uncontrolledWrapper.find('textarea').simulate('focus', {
            target: { scrollHeight: 40 },
        });
        expect(uncontrolledWrapper.find('textarea').prop('style')).toEqual({ height: 40 });

        // handleInputChange()
        uncontrolledWrapper.find('textarea').simulate('change', {
            target: { scrollHeight: 90 },
        });
        expect(uncontrolledWrapper.find('textarea').prop('style')).toEqual({ height: 90 });
    });

    it('auto-grows on controlled value change under multiLine mode', () => {
        const controlledWrapper = mount(
            <PatchedRow
                multiLine
                label="foo"
                value="bar" />
        );

        // componentDidMount()
        expect(controlledWrapper.find('textarea').prop('style')).toEqual({ height: 30 });

        // componentDidUpdate()
        controlledWrapper.setProps({ value: 'more bar' });
        expect(controlledWrapper.find('textarea').prop('style')).toEqual({ height: 60 });
    });

    it('accepts additional children', () => {
        const wrapper = mount(
            <PureTextInputRow label="foo">
                <span data-foo />
            </PureTextInputRow>
        );

        expect(wrapper.containsMatchingElement(<span data-foo />)).toBeTruthy();
    });

    it('keeps a ref to the <input> inside', () => {
        const wrapper = mount(
            <PureTextInputRow label="foo" />
        );

        const inputRef = wrapper.instance().getInputNode();
        expect(inputRef).toBeInstanceOf(HTMLInputElement);
    });
});
