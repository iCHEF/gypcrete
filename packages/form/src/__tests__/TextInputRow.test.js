import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { ListRow, TextInput } from '@ichef/gypcrete';

import TextInputRow, { PureTextInputRow } from '../TextInputRow';

describe('formRow(TextInputRow)', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
      <TextInputRow
        label="foo"
        defaultValue="bar"
      />
    );

    ReactDOM.render(element, div);
  });
});

describe('Pure <TextInputRow>', () => {
  it("renders a <ListRow> as wrapper, taking props from 'rowProps'", () => {
    const mockedRowProps = {
      foo: 'foo',
      bar: 'bar',
    };
    const wrapper = shallow(
      <PureTextInputRow
        readOnly={false}
        disabled={false}
        rowProps={mockedRowProps}
      />
    );
    expect(wrapper.is(ListRow));
    expect(wrapper.props()).toMatchObject(mockedRowProps);
  });


  it('renders an <TextInput> inside with readOnly/disable props', () => {
    const wrapper = shallow(
      <PureTextInputRow
        readOnly={false}
        disabled
        rowProps={{}}
      />
    );

    expect(wrapper.containsMatchingElement(
      <TextInput
        readOnly={false}
        disabled
      />
    )).toBeTruthy();
  });

  it('allows additional children', () => {
    const wrapper = shallow(
      <PureTextInputRow
        readOnly={false}
        disabled
        rowProps={{}}
      >
        <div data-target />
      </PureTextInputRow>
    );

    expect(
      wrapper.children().containsMatchingElement(
        <div data-target />
      )
    ).toBeTruthy();
  });

  it('forwards unknown props to <TextInput>', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <PureTextInputRow
        readOnly
        disabled={false}
        rowProps={{}}
        label="Foo"
        onChange={handleChange}
      />
    );

    expect(wrapper.containsMatchingElement(
      <TextInput
        readOnly
        disabled={false}
        label="Foo"
        onChange={handleChange}
      />
    )).toBeTruthy();
  });
});
