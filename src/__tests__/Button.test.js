import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Button, { PureButton } from '../Button';

describe('rowComp(Button)', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = <Button basic="label" />;

        ReactDOM.render(element, div);
    });

    it('is minified by default', () => {
        const wrapper = shallow(<div><Button basic="label" /></div>);

        expect(wrapper.find(Button).prop('minified')).toBeTruthy();
    });
});

describe('Pure <Button>', () => {
    it('handles primary modifier', () => {
        const wrapper = shallow(<PureButton primary>Label</PureButton>);

        expect(wrapper.hasClass('gyp-button--primary')).toBeTruthy();
    });

    it('handles color modifiers', () => {
        let wrapper = shallow(<PureButton>Label</PureButton>);
        expect(wrapper.hasClass('gyp-button--blue')).toBeTruthy();

        wrapper = shallow(<PureButton color="red">Label</PureButton>);
        expect(wrapper.hasClass('gyp-button--red')).toBeTruthy();

        wrapper = shallow(<PureButton color="white">Label</PureButton>);
        expect(wrapper.hasClass('gyp-button--white')).toBeTruthy();

        wrapper = shallow(<PureButton color="black">Label</PureButton>);
        expect(wrapper.hasClass('gyp-button--black')).toBeTruthy();
    });

    it('handles solid modifier', () => {
        const wrapper = shallow(<PureButton solid>Label</PureButton>);

        expect(wrapper.hasClass('gyp-button--solid')).toBeTruthy();
    });
});
