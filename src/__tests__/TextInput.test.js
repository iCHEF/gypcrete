import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { getTextLayoutProps, ROW_COMP_ALIGN } from '../mixins/rowComp';
import EditableText from '../EditableText';
import TextInput, { PureTextInput } from '../TextInput';

describe('rowComp(TextInput)', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = <TextInput />;

        ReactDOM.render(element, div);
    });

    it('reverse-aligns by default', () => {
        const wrapper = shallow(<div><TextInput /></div>);

        expect(wrapper.childAt(0).prop('align')).toBe('reverse');
    });
});

describe('pure <TextInput>', () => {
    it('renders with a proper-named wrapper', () => {
        const wrapper = shallow(<PureTextInput />);

        expect(wrapper.hasClass('gyp-text-input')).toBeTruthy();
    });

    it('can set props to div-wrapper via wrapperProps', () => {
        const wrapper = shallow(
            <PureTextInput
                wrapperProps={{ disabled: true, 'data-foo': 'bar' }} />
        );

        expect(wrapper.is('div')).toBeTruthy();
        expect(wrapper.prop('disabled')).toBeTruthy();
        expect(wrapper.prop('data-foo')).toBe('bar');
    });

    it('renders <EditableText> and ignores chidlren from parent mixin', () => {
        const wrapper = shallow(
            <PureTextInput>
                <span data-foo />
                Bar content
            </PureTextInput>
        );

        expect(wrapper.text()).toBe('<withStatus(EditableText) />');
        expect(wrapper.containsMatchingElement(<span data-foo />)).toBeFalsy();
    });

    it('renders <EditableText> with layout props the same as rowComp()', () => {
        const wrapper = shallow(<PureTextInput />, { context: { align: 'left' } });

        Object.values(ROW_COMP_ALIGN).forEach((alignment) => {
            const layoutProps = getTextLayoutProps(alignment, false);
            wrapper.setContext({ align: alignment });

            expect(wrapper.find(EditableText).prop('align')).toBe(layoutProps.align);
            expect(wrapper.find(EditableText).prop('noGrow')).toBe(layoutProps.noGrow);
        });
    });

    it('passes unknown props to <EditableText>', () => {
        const wrapper = shallow(<PureTextInput className="foo" foo="bar" />);

        expect(wrapper.find(EditableText).prop('className')).toBeUndefined();
        expect(wrapper.find(EditableText).prop('foo')).toBe('bar');
    });
});
