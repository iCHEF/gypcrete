import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import EditableBasicRow from '../EditableBasicRow';
import EditableText, { PureEditableText } from '../EditableText';
import { PureText } from '../Text';

describe('withStatus(EditableText)', () => {
  it('renders without crashing', () => {
    const element = <EditableText />;

    render(element);
  });
});

describe('pure <PureEditableText>', () => {
  it('renders <EditableBasicRow> with pure <Text>', () => {
    const wrapper = shallow(<PureEditableText />);

    expect(wrapper.find(PureText)).toHaveLength(1);
    expect(wrapper.find(PureText).dive().find(EditableBasicRow)).toHaveLength(1);
  });

  it('updates state on <EditableBasicRow> focus/blur', () => {
    const wrapper = shallow(<PureEditableText />);
    const rowWrapper = wrapper.find(PureText).dive().find(EditableBasicRow);

    expect(wrapper.state('focused')).toBeFalsy();

    rowWrapper.simulate('focus');
    expect(wrapper.state('focused')).toBeTruthy();

    rowWrapper.simulate('blur');
    expect(wrapper.state('focused')).toBeFalsy();
  });

  it('forwards onFocus/onBlur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    const wrapper = shallow(
      <PureEditableText
        onFocus={handleFocus}
        onBlur={handleBlur}
      />,
    );
    const rowWrapper = wrapper.find(PureText).dive().find(EditableBasicRow);

    expect(handleFocus).not.toHaveBeenCalled();
    expect(handleBlur).not.toHaveBeenCalled();

    rowWrapper.simulate('focus');
    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).not.toHaveBeenCalled();

    rowWrapper.simulate('blur');
    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('strips status props from <PureText> when focused', () => {
    const mockedIcon = <span data-icon />;
    const wrapper = shallow(
      <PureEditableText
        statusIcon={mockedIcon}
        errorMsg="Foo-Bar"
      />,
    );

    expect(wrapper.prop('statusIcon')).toEqual(mockedIcon);
    expect(wrapper.prop('errorMsg')).toBe('Foo-Bar');

    wrapper.setState({ focused: true });

    expect(wrapper.prop('statusIcon')).toBeUndefined();
    expect(wrapper.prop('errorMsg')).toBeUndefined();
  });

  it('passes status to <EditableBasicRow> and sets it as readOnly when status is loading', () => {
    const wrapper = shallow(<PureEditableText />);

    let rowWrapper = wrapper.find(PureText).dive().find(EditableBasicRow);
    expect(rowWrapper.prop('readOnly')).toBeFalsy();

    wrapper.setProps({ status: 'loading' });
    // Refreshes row from updated wrapper
    rowWrapper = wrapper.find(PureText).dive().find(EditableBasicRow);
    expect(rowWrapper.prop('readOnly')).toBeTruthy();
    expect(rowWrapper.prop('status')).toBe('loading');

    wrapper.setProps({ status: 'success' });
    // Refreshes row from updated wrapper
    rowWrapper = wrapper.find(PureText).dive().find(EditableBasicRow);
    expect(rowWrapper.prop('readOnly')).toBeFalsy();
    expect(rowWrapper.prop('status')).toBe('success');
  });

  it('passes unknown props to <EditableBasicRow>', () => {
    const wrapper = shallow(
      <PureEditableText
        noGrow
        foo
        bar="Bar"
      />,
    );
    const rowWrapper = wrapper.find(PureText).dive().find(EditableBasicRow);

    // Known prop for <PureText>
    expect(rowWrapper.prop('noGrow')).toBeUndefined();

    // Unknown props
    expect(rowWrapper.prop('foo')).toBeTruthy();
    expect(rowWrapper.prop('bar')).toBe('Bar');
  });
});
