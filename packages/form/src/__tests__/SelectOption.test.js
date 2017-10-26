import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import { Checkbox } from '@ichef/gypcrete';
import SelectOption from '../SelectOption';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <SelectOption label="foo" value="bar" />
    );

    ReactDOM.render(element, div);
});

it('renders <Checkbox> inside', () => {
    const wrapper = mount(
        <SelectOption label="foo" value="bar" checked readOnly />
    );

    expect(wrapper.find(Checkbox).props()).toMatchObject({
        basic: 'foo',
        checked: true,
        disabled: true,
    });
});

it('passes new checked state via onChange()', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
        <SelectOption label="foo" value="bar" onChange={handleChange} />
    );

    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(handleChange).toHaveBeenLastCalledWith('bar', true);
});

it('does not break when without explicit onChange', () => {
    const wrapper = mount(
        <SelectOption label="foo" value="bar" />
    );

    wrapper.find('input').simulate('change', { target: { checked: true } });
});
