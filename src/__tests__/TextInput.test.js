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

    it('passes only white-listed props to <EditableText>', () => {
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        const handleChange = jest.fn();

        const whitelistedProps = {
            value: 'Foo',
            defaultValue: 'Bar',
            placeholder: 'john.appleseed@example.com',
            disabled: false,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onChange: handleChange,
        };

        const wrapper = shallow(
            <PureTextInput
                {...whitelistedProps}
                input={{ id: 'foo-dom-id' }}
                data-unsupported-prop />
        );
        const textWrapper = wrapper.childAt(0);

        Object.entries(whitelistedProps).forEach(([key, value]) => {
            expect(textWrapper.prop(key)).toBe(value);
        });

        expect(textWrapper.prop('input')).toEqual({ id: 'foo-dom-id' });
        expect(textWrapper.prop('data-unsupported-prop')).toBeUndefined();
    });
});
