import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SwitchIcon from '../SwitchIcon';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <SwitchIcon />;

    ReactDOM.render(element, div);
});


it('can be turned on or off', () => {
    const wrapper = shallow(<SwitchIcon state="on" />);
    expect(wrapper.hasClass('gyp-switch-icon--on')).toBeTruthy();
    expect(wrapper.hasClass('gyp-switch-icon--off')).toBeFalsy();

    wrapper.setProps({ state: 'off' });
    expect(wrapper.hasClass('gyp-switch-icon--off')).toBeTruthy();
    expect(wrapper.hasClass('gyp-switch-icon--on')).toBeFalsy();
});
