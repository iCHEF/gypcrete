import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Section, { BEM as SECTION_BEM } from '../Section';

it('renders without crashing', () => {
  const element = <Section title="Title">Hello world</Section>;

  render(element);
});

it('renders title in <div> only when specified', () => {
  const wrapper = shallow(<Section>Foo</Section>);
  expect(wrapper.find(`.${SECTION_BEM.title}`).exists()).toBeFalsy();

  wrapper.setProps({ title: 'Bar' });
  expect(wrapper.find(`.${SECTION_BEM.title}`)).toHaveLength(1);
  expect(wrapper.find(`.${SECTION_BEM.title}`).text()).toBe('Bar');
});

it('renders desc in <div> only when specified', () => {
  const wrapper = shallow(<Section>Foo</Section>);
  expect(wrapper.find(`.${SECTION_BEM.footer}`).exists()).toBeFalsy();

  wrapper.setProps({ desc: 'Bar' });
  expect(wrapper.find(`.${SECTION_BEM.footer}`)).toHaveLength(1);
  expect(wrapper.find(`.${SECTION_BEM.footer}`).text()).toContain('Bar');
});

it('renders errorMsg in <div> only when specified', () => {
  const wrapper = shallow(<Section>Foo</Section>);
  expect(wrapper.find(`.${SECTION_BEM.footer}`).exists()).toBeFalsy();

  wrapper.setProps({ errorMsg: 'Bar' });
  expect(wrapper.find(`.${SECTION_BEM.footer}`)).toHaveLength(1);
  expect(wrapper.find(`.${SECTION_BEM.footer}`).text()).toContain('Bar');
});

it('renders children in a section body', () => {
  const wrapper = shallow(<Section>Foo</Section>);

  expect(wrapper.find(`.${SECTION_BEM.body}`).exists()).toBeTruthy();
  expect(wrapper.find(`.${SECTION_BEM.body}`).text()).toBe('Foo');
});

it("removes class to discard padding for section body when 'bodySpacing' is false", () => {
  const wrapper = shallow(<Section />);
  const expectedClassName = SECTION_BEM.body.modifier('padded').toString();
  expect(wrapper.find(`.${SECTION_BEM.body}`).hasClass(expectedClassName)).toBeTruthy();

  wrapper.setProps({ bodySpacing: false });
  expect(wrapper.find(`.${SECTION_BEM.body}`).hasClass(expectedClassName)).toBeFalsy();
});

it("adds class to remove vertical margin when 'verticalSpacing' is false", () => {
  const wrapper = shallow(<Section />);
  const expectedClassName = SECTION_BEM.root.modifier('no-margin').toString();
  expect(wrapper.hasClass(expectedClassName)).toBeFalsy();

  wrapper.setProps({ verticalSpacing: false });
  expect(wrapper.hasClass(expectedClassName)).toBeTruthy();
});
