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
    it('renders a <button type=button>', () => {
        const wrapper = shallow(<PureButton solid>Label</PureButton>);

        expect(wrapper.children()).toHaveLength(1);
        expect(wrapper.find('button').exists()).toBeTruthy();
        expect(wrapper.find('button').prop('type')).toBe('button');
    });

    it('handles color modifiers', () => {
        let wrapper = shallow(<PureButton>Label</PureButton>);
        expect(wrapper.hasClass('ic-button--blue')).toBeTruthy();

        wrapper = shallow(<PureButton color="red">Label</PureButton>);
        expect(wrapper.hasClass('ic-button--red')).toBeTruthy();

        wrapper = shallow(<PureButton color="white">Label</PureButton>);
        expect(wrapper.hasClass('ic-button--white')).toBeTruthy();

        wrapper = shallow(<PureButton color="black">Label</PureButton>);
        expect(wrapper.hasClass('ic-button--black')).toBeTruthy();
    });

    it('handles solid modifier', () => {
        const wrapper = shallow(<PureButton solid>Label</PureButton>);

        expect(wrapper.hasClass('ic-button--solid')).toBeTruthy();
    });
});
