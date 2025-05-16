import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import AutoSizeTextarea from 'react-textarea-autosize';

import { PureText } from '../Text';
import TextInput, { PureTextInput, TextInputBasicRow, InnerInput, BEM } from '../TextInput';

describe('<TextInputBasicRow> helper component', () => {
  it('renders "basic" with a simple wrapper', () => {
    const wrapper = shallow(
      <TextInputBasicRow
        basic={<div data-target />}
        className="foo-row"
      />,
    );

    expect(wrapper.hasClass('foo-row')).toBeTruthy();
    expect(wrapper.children().matchesElement(<div data-target />));
  });
});

describe('<InnerInput> helper component', () => {
  it('renders an <input type="text"> by default, with inputProps', () => {
    const wrapper = shallow(<InnerInput inputProps={{ foo: 'bar' }} />);

    expect(
      wrapper.matchesElement(
        <input
          type="text"
          foo="bar"
        />,
      ),
    ).toBeTruthy();
  });

  it('renders an <AutoSizeTextarea> with defaults in multi-line mode, with inputProps', () => {
    const wrapper = shallow(<InnerInput multiLine />);

    expect(wrapper.matchesElement(<AutoSizeTextarea minRows={2} />)).toBeTruthy();

    wrapper.setProps({
      minRows: 5,
      maxRows: 9,
      inputProps: { foo: 'bar' },
    });
    expect(
      wrapper.matchesElement(
        <AutoSizeTextarea
          minRows={5}
          maxRows={9}
          foo="bar"
        />,
      ),
    ).toBeTruthy();
  });

  it('allows custom input rendering via "renderInput" prop', () => {
    const mockedRenderer = jest.fn(() => null);
    shallow(
      <InnerInput
        inputProps={{ foo: 'bar' }}
        renderInput={mockedRenderer}
      />,
    );

    expect(mockedRenderer).toHaveBeenLastCalledWith({ foo: 'bar' });
  });
});

describe('rowComp(TextInput)', () => {
  it('renders without crashing', () => {
    const element = <TextInput />;

    render(element);
  });

  it('has reversed vertical order by default', () => {
    const wrapper = shallow(
      <div>
        <TextInput />
      </div>,
    );

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
    const wrapper = shallow(<PureTextInput />, { context: { textProps: mockedTextProps } });
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

  it('renders a customized <InnerInput> on basic prop of <PureText>', () => {
    const mockedRenderer = jest.fn(() => null);

    const wrapper = shallow(
      <PureTextInput
        multiLine
        readOnly
        minRows={5}
        maxRows={9}
        renderInput={mockedRenderer}
      />,
    );

    expect(wrapper.find(PureText).prop('basic')).toMatchObject(
      <InnerInput
        multiLine
        minRows={5}
        maxRows={9}
        renderInput={mockedRenderer}
        inputProps={{
          className: BEM.input.toString(),
          placeholder: 'Unset',
          readOnly: true,
          disabled: false,
        }}
      />,
    );

    wrapper.setProps({
      multiLine: false,
      readOnly: false,
      disabled: true,
    });

    expect(wrapper.find(PureText).prop('basic').props).toMatchObject({
      multiLine: false,
      inputProps: {
        readOnly: false,
        disabled: true,
      },
    });
  });

  it('forwards unknown props to <InnerInput> via "inputProps" prop', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <PureTextInput
        foo="bar"
        onChange={handleChange}
      />,
    );

    expect(wrapper.find(PureText).prop('basic').props).toMatchObject({
      inputProps: {
        foo: 'bar',
        onChange: handleChange,
      },
    });
  });

  it('show postfix given postfix prop', () => {
    const wrapper = shallow(<PureTextInput postfix="Dollars" />);
    const postfixWrapper = wrapper.find('.gyp-text-input__postfix');

    expect(postfixWrapper.text()).toEqual('Dollars');
  });
});
