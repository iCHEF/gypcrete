import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import AutoSizeTextarea from 'react-textarea-autosize';

import { PureText } from '../Text';
import TextInput, { PureTextInput, TextInputBasicRow, BEM } from '../TextInput';

describe('<TextInputBasicRow> helper component', () => {
    it('renders "basic" with a simple wrapper', () => {
        const wrapper = shallow(
            <TextInputBasicRow
                basic={<div data-target />}
                className="foo-row"
            />
        );

        expect(wrapper.hasClass('foo-row')).toBeTruthy();
        expect(wrapper.children().matchesElement(<div data-target />));
    });
});

describe('rowComp(TextInput)', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = <TextInput />;

        ReactDOM.render(element, div);
    });

    it('has reversed vertical order by default', () => {
        const wrapper = shallow(<div><TextInput /></div>);

        expect(wrapper.childAt(0).prop('verticalOrder')).toBe('reverse');
    });
});

describe('pure <TextInput>', () => {
    it('renders a <PureText> with a named wrapper', () => {
        const wrapper = shallow(<PureTextInput />);

        expect(wrapper.hasClass('gyp-text-input')).toBeTruthy();
        expect(wrapper.find(PureText).exists()).toBeTruthy();
    });

    it('sets props for <PureText> from context', () => {
        const mockedTextProps = { foo: 'bar' };
        const wrapper = shallow(
            <PureTextInput />,
            { context: { textProps: mockedTextProps } },
        );
        expect(wrapper.find(PureText).prop('foo')).toBe('bar');
    });

    it('customizes <PureText> rendering', () => {
        const wrapper = shallow(<PureTextInput label="Foo" />);

        expect(wrapper.find(PureText).prop('bold')).toBeTruthy();
        expect(wrapper.find(PureText).prop('basicRow')).toEqual(<TextInputBasicRow />);
        expect(wrapper.find(PureText).prop('aside')).toBe('Foo');

        wrapper.setProps({ readOnly: true });
        expect(wrapper.find(PureText).prop('bold')).toBeFalsy();

        wrapper.setProps({ readOnly: false, disabled: true });
        expect(wrapper.find(PureText).prop('bold')).toBeFalsy();
    });

    it('renders an <input type="text"> by default', () => {
        const wrapper = shallow(<PureTextInput />);

        expect(wrapper.find(PureText).prop('basic')).toMatchObject(
            <input type="text" />
        );
    });

    it('renders an <AutoSizeTextarea> with defaults in multi-line mode', () => {
        const wrapper = shallow(<PureTextInput multiLine />);
        expect(wrapper.find(PureText).prop('basic')).toMatchObject(
            <AutoSizeTextarea minRows={2} />
        );

        wrapper.setProps({
            minRows: 5,
            maxRows: 9,
        });
        expect(wrapper.find(PureText).prop('basic')).toMatchObject(
            <AutoSizeTextarea minRows={5} maxRows={9} />
        );
    });
});

describe.each([false, true])(
    'input behavior when multiLine=%p',
    (multiLine) => {
        it('has shared props', () => {
            const wrapper = shallow(<PureTextInput multiLine={multiLine} />);

            expect(wrapper.find(PureText).prop('basic')).toMatchObject({
                props: {
                    className: BEM.input.toString(),
                    placeholder: 'Unset',
                    readOnly: false,
                    disabled: false,
                },
            });
        });

        it('is forwarded with props that is unknown for <TextInput>', () => {
            const handleChange = jest.fn();
            const wrapper = shallow(
                <PureTextInput
                    multiLine={multiLine}
                    placeholder="(Empty)"
                    onChange={handleChange}
                />
            );

            expect(wrapper.find(PureText).prop('basic')).toMatchObject({
                props: {
                    placeholder: '(Empty)',
                    onChange: handleChange,
                },
            });
        });

        it('reflects readOnly or disabled props', () => {
            const wrapper = shallow(<PureTextInput multiLine={multiLine} />);
            expect(wrapper.find(PureText).prop('basic')).toMatchObject({
                props: {
                    readOnly: false,
                    disabled: false,
                },
            });

            wrapper.setProps({ readOnly: true });
            expect(wrapper.find(PureText).prop('basic')).toMatchObject({
                props: {
                    readOnly: true,
                    disabled: false,
                },
            });

            wrapper.setProps({ readOnly: false, disabled: true });
            expect(wrapper.find(PureText).prop('basic')).toMatchObject({
                props: {
                    readOnly: false,
                    disabled: true,
                },
            });
        });
    }
);
