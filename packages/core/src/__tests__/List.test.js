import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import List from '../List';
import Section from '../Section';

import ListSpacingContext from '../contexts/listSpacing';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <List title="Title">Hello world</List>;

  ReactDOM.render(element, div);
});

it('consumes context to render a <Section> with spacing configs', () => {
  const wrapper = shallow(<List>Foo Bar</List>);
  expect(wrapper.is(ListSpacingContext.Consumer)).toBeTruthy();

  const renderedElement = wrapper.prop('children')(true);
  expect(renderedElement.type).toBe(Section);
  expect(renderedElement.props.verticalSpacing).toBe(true);
  expect(renderedElement.props.bodySpacing).toBe(false);
});

it('renders a <ul> inside root <Section>', () => {
  const wrapper = mount(<List>Foo Bar</List>);

  expect(wrapper.find(Section).find('ul').exists()).toBeTruthy();
  expect(wrapper.find(Section).find('ul').text()).toBe('Foo Bar');
});

it('renders in variants with "normal" as default', () => {
  const wrapper = mount(<List>Foo Bar</List>);
  expect(wrapper.find(Section).hasClass('gyp-list--normal')).toBeTruthy();

  wrapper.setProps({ variant: 'setting' });
  expect(wrapper.find(Section).hasClass('gyp-list--setting')).toBeTruthy();

  wrapper.setProps({ variant: 'button' });
  expect(wrapper.find(Section).hasClass('gyp-list--button')).toBeTruthy();
});

it('passes unknown props to wrapper <Section>', () => {
  const wrapper = mount(
    <List
      id="foo"
      verticalSpacing={false}
    />
  );

  expect(wrapper.find(Section).props()).toEqual(
    expect.objectContaining({
      id: 'foo',
      verticalSpacing: false,
    })
  );
});
