import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import EditableBasicRow, { BEM } from '../EditableBasicRow';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <EditableBasicRow />;

    ReactDOM.render(element, div);
});

it('renders an <input> or <textarea> inside a <BasicRow>', () => {
    const wrapper = shallow(<EditableBasicRow />);

    expect(wrapper.find('BasicRow')).toHaveLength(1);
    expect(wrapper.find('BasicRow').find('input')).toHaveLength(1);
    expect(wrapper.find('BasicRow').find('textarea')).toHaveLength(0);

    wrapper.setProps({ inputTag: 'textarea' });
    expect(wrapper.find('BasicRow').find('input')).toHaveLength(0);
    expect(wrapper.find('BasicRow').find('textarea')).toHaveLength(1);
});

it('updates state on input focus/blur', () => {
    const wrapper = shallow(<EditableBasicRow />);
    const inputWrapper = wrapper.find('input');

    expect(wrapper.state('focused')).toBeFalsy();

    inputWrapper.simulate('focus');
    expect(wrapper.state('focused')).toBeTruthy();

    inputWrapper.simulate('blur');
    expect(wrapper.state('focused')).toBeFalsy();
});

it('forwards onFocus/onBlur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    const wrapper = shallow(<EditableBasicRow onFocus={handleFocus} onBlur={handleBlur} />);
    const inputWrapper = wrapper.find('input');

    expect(handleFocus).not.toHaveBeenCalled();
    expect(handleBlur).not.toHaveBeenCalled();

    inputWrapper.simulate('focus');
    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).not.toHaveBeenCalled();

    inputWrapper.simulate('blur');
    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
});

it('forwards onChange event', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<EditableBasicRow onChange={handleChange} />);
    const inputWrapper = wrapper.find('input');

    expect(handleChange).not.toHaveBeenCalled();

    inputWrapper.simulate('change', { currentTarget: document.createElement('input') });
    expect(handleChange).toHaveBeenCalledTimes(1);
});

it('updates user input inside state when not controlled', () => {
    const wrapper = shallow(<EditableBasicRow defaultValue="Foo" />);
    const inputWrapper = wrapper.find('input');
    const mockedInput = document.createElement('input');

    expect(wrapper.state('currentValue')).toBe('Foo');

    mockedInput.value = 'Bar';
    inputWrapper.simulate('change', { currentTarget: mockedInput });
    expect(wrapper.state('currentValue')).toBe('Bar');
});

it('freezes input value when controlled via prop', () => {
    const wrapper = shallow(<EditableBasicRow value="Foo" />);
    const inputWrapper = wrapper.find('input');
    const mockedInput = document.createElement('input');

    expect(wrapper.state('currentValue')).toBe('Foo');

    mockedInput.value = 'Bar';
    inputWrapper.simulate('change', { currentTarget: mockedInput });
    expect(wrapper.state('currentValue')).toBe('Foo');
});

it('renders basic label with the same visual text from input', () => {
    const wrapper = mount(<EditableBasicRow value="Foo" placeholder="Unset" />);
    const labelClass = `.${BEM.basicLabel}`;
    expect(wrapper.find(labelClass).text()).toBe('Foo');

    wrapper.setProps({ value: 'Bar' });
    expect(wrapper.find(labelClass).text()).toBe('Bar');

    wrapper.setProps({ value: '' });
    expect(wrapper.find(labelClass).text()).toBe('Unset');
});

it('renders basic label with additional line-break when tag is textarea', () => {
    const wrapper = mount(
        <EditableBasicRow inputTag="textarea" value="Foo" placeholder="Unset" />
    );
    const labelClass = `.${BEM.basicLabel}`;
    expect(wrapper.find(labelClass).text()).toBe('Foo\n');

    wrapper.setProps({ value: 'Foo\n' });
    expect(wrapper.find(labelClass).text()).toBe('Foo\n\n');
});

it('keeps input from keyboard navigation when input looks untouchable', () => {
    const wrapper = shallow(<EditableBasicRow readOnly={false} disabled={false} />);
    expect(wrapper.find('input').prop('tabIndex')).toBeUndefined();

    wrapper.setProps({ readOnly: true, disabled: false });
    expect(wrapper.find('input').prop('tabIndex')).toBe(-1);

    wrapper.setProps({ readOnly: false, disabled: true });
    expect(wrapper.find('input').prop('tabIndex')).toBe(-1);
});

it('passes unknown props to its underlying input', () => {
    const wrapper = shallow(<EditableBasicRow autoFocus id="foo-input" />);

    expect(wrapper.find('input').prop('autoFocus')).toBeTruthy();
    expect(wrapper.find('input').prop('id')).toBe('foo-input');
});
