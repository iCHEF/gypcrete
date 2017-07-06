import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import List, { BEM as LIST_BEM } from '../List';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <List title="Title">Hello world</List>;

    ReactDOM.render(element, div);
});

it('renders in variants with "normal" as default', () => {
    const wrapper = shallow(<List>Foo Bar</List>);
    expect(wrapper.hasClass(`${LIST_BEM.root.modifier('normal')}`)).toBeTruthy();

    wrapper.setProps({ variant: 'setting' });
    expect(wrapper.hasClass(`${LIST_BEM.root.modifier('setting')}`)).toBeTruthy();

    wrapper.setProps({ variant: 'button' });
    expect(wrapper.hasClass(`${LIST_BEM.root.modifier('button')}`)).toBeTruthy();
});

it('renders children inside a <ul>', () => {
    const wrapper = shallow(<List>Foo Bar</List>);

    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find('ul').text()).toBe('Foo Bar');
});

it('renders title in <div> when specified', () => {
    const wrapper = shallow(<List>Foo</List>);
    expect(wrapper.find(`.${LIST_BEM.title}`).exists()).toBeFalsy();

    wrapper.setProps({ title: 'Bar' });
    expect(wrapper.find(`.${LIST_BEM.title}`)).toHaveLength(1);
    expect(wrapper.find(`.${LIST_BEM.title}`).text()).toBe('Bar');
});

it('renders desc in <div> when specified', () => {
    const wrapper = shallow(<List>Foo</List>);
    expect(wrapper.find(`.${LIST_BEM.desc}`).exists()).toBeFalsy();

    wrapper.setProps({ desc: <span data-test="foo" /> });
    expect(wrapper.find(`.${LIST_BEM.desc}`)).toHaveLength(1);
    expect(wrapper.find(`.${LIST_BEM.desc}`).find('[data-test="foo"]')).toHaveLength(1);
});
