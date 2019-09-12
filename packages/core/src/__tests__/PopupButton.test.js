import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Button from '../Button';
import PopupButton, { COMPONENT_NAME } from '../PopupButton';

it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = <PopupButton />;

    ReactDOM.render(element, div);
});

it('returns a pre-configured <Button> extending given props', () => {
    const wrapper = shallow(<PopupButton basic="foo" aside="bar" />);
    expect(wrapper.matchesElement(
        <Button
            minified={false}
            align="center"
            basic="foo"
            aside="bar"
        />
    )).toBeTruthy();
});

it('mixes className with own class name', () => {
    const wrapper = shallow(<PopupButton basic="foo" className="bar" />);

    expect(wrapper.hasClass(COMPONENT_NAME));
    expect(wrapper.hasClass('bar'));
});
