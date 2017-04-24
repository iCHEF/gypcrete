import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Checkbox, { CHECKBOX_BUTTON } from '../Checkbox';
import IconCheckbox from '../IconCheckbox';
import IconLayout from '../IconLayout';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <IconCheckbox status="loading" />;

    ReactDOM.render(element, div);
});

it('renders as a custom-configured, minified variant of <Checkbox>', () => {
    const wrapper = shallow(<IconCheckbox status="loading" />);

    expect(wrapper.find(Checkbox).exists()).toBeTruthy();
    expect(wrapper.find(Checkbox).prop('status')).toBe('loading');
    expect(wrapper.find(Checkbox).prop('minified')).toBeTruthy();
});

it('overrides checkbox button with <IconLayout>', () => {
    const wrapper = shallow(<IconCheckbox status="loading" />);

    expect(wrapper.find(Checkbox).prop('overrideButton').type).toBe(IconLayout);
    expect(wrapper.find(Checkbox).prop('overrideButton').props.icon).toBe(CHECKBOX_BUTTON);
});
