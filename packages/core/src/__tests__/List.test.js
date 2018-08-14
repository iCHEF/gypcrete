import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import List, { BEM as LIST_BEM } from '../List';
import Section from '../Section';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <List title="Title">Hello world</List>;

    ReactDOM.render(element, div);
});

it('renders a <ul> inside a <Section> without body spacing', () => {
    const wrapper = shallow(<List>Foo Bar</List>);

    expect(wrapper.is(Section)).toBeTruthy();
    expect(wrapper.prop('bodySpacing')).toBeFalsy();

    expect(wrapper.children('ul').exists()).toBeTruthy();
    expect(wrapper.children('ul').text()).toBe('Foo Bar');
});

it('renders in variants with "normal" as default', () => {
    const wrapper = shallow(<List>Foo Bar</List>);
    expect(wrapper.hasClass(`${LIST_BEM.root.modifier('normal')}`)).toBeTruthy();

    wrapper.setProps({ variant: 'setting' });
    expect(wrapper.hasClass(`${LIST_BEM.root.modifier('setting')}`)).toBeTruthy();

    wrapper.setProps({ variant: 'button' });
    expect(wrapper.hasClass(`${LIST_BEM.root.modifier('button')}`)).toBeTruthy();
});

it('passes unknown props to wrapper <Section>', () => {
    const wrapper = shallow(
        <List
            id="foo"
            verticalSpacing={false} />
    );

    expect(wrapper.find(Section).props()).toEqual(
        expect.objectContaining({
            id: 'foo',
            verticalSpacing: false,
        })
    );
});
