import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { ListRow } from '@ichef/gypcrete';
import AutoSizeTextarea from 'react-textarea-autosize';

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

    it('pass minRows & maxRows props to <AutoSizeTextarea> when multiLine is true', () => {
        const uncontrolledWrapper = mount(
            <PatchedRow
                multiLine
                label="foo"
                defaultValue="bar"
                minRows={5}
                maxRows={10}
            />
        );

        const textareaWrapper = uncontrolledWrapper.find(AutoSizeTextarea);
        expect(textareaWrapper.exists()).toBeTruthy();
        expect(textareaWrapper.props()).toMatchObject({ minRows: 5, maxRows: 10 });
    });

    it('accepts additional children', () => {
        const wrapper = mount(
            <PureTextInputRow label="foo">
                <span data-foo />
            </PureTextInputRow>
        );

        expect(wrapper.containsMatchingElement(<span data-foo />)).toBeTruthy();
    });
});
