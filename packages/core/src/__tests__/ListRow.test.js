import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import ListRow, { BEM as ROW_BEM } from '../ListRow';
import ListSpacingContext from '../contexts/listSpacing';

it('renders without crashing', () => {
  const element = <ListRow>Hello world</ListRow>;

  render(element);
});

it('renders a <li> element with class name of root wrapper', () => {
  const wrapper = shallow(<ListRow>Foo</ListRow>);

  expect(wrapper.find('li').exists()).toBeTruthy();
  expect(wrapper.find('li').hasClass(`${ROW_BEM.root}`));
});

it('renders children inside a body wrapper', () => {
  const wrapper = shallow(<ListRow>Foo</ListRow>);

  expect(wrapper.find(`.${ROW_BEM.body}`)).toHaveLength(1);
  expect(wrapper.find(`.${ROW_BEM.body}`).text()).toBe('Foo');
});

it('renders footer when has desc or error msg', () => {
  const wrapper = shallow(<ListRow>Foo</ListRow>);
  expect(wrapper.find(`.${ROW_BEM.footer}`)).toHaveLength(0);

  wrapper.setProps({ desc: 'bar' });
  expect(wrapper.find(`.${ROW_BEM.footer}`)).toHaveLength(1);
  expect(wrapper.find(`.${ROW_BEM.footer}`).text()).toBe('bar');

  wrapper.setProps({ desc: null, errorMsg: 'foo' });
  expect(wrapper.find(`.${ROW_BEM.footer}`)).toHaveLength(1);
  expect(wrapper.find(`.${ROW_BEM.footer}`).text()).toBe('foo');
});

it('renders errorMsg before desc when both exist', () => {
  const wrapper = shallow(
    <ListRow
      desc="foo"
      errorMsg="bar"
    >
      Foo
    </ListRow>,
  );

  expect(wrapper.find(`.${ROW_BEM.footer}`)).toHaveLength(1);
  expect(wrapper.find(`.${ROW_BEM.footer}`).childAt(0).text()).toBe('bar');
  expect(wrapper.find(`.${ROW_BEM.footer}`).childAt(1).text()).toBe('foo');
});

it('handles highlight modifier', () => {
  const wrapper = shallow(<ListRow highlight>Foo</ListRow>);
  const expectedClassName = ROW_BEM.root.modifier('highlight').toString();

  expect(wrapper.find('li').find('div').first().hasClass(expectedClassName)).toBeTruthy();
});

it('renders nested item inside <li> but outside of body wrapper', () => {
  const wrapper = shallow(<ListRow nestedList={<span data-test="bar" />}>Foo</ListRow>);

  expect(wrapper.find('span[data-test]')).toHaveLength(1);
  expect(wrapper.find(`.${ROW_BEM.body}`).find('span[data-test]').exists()).toBeFalsy();
});

it('provides context for nested list spacing', () => {
  const wrapper = shallow(<ListRow>Foo bar</ListRow>);

  expect(wrapper.find(ListSpacingContext.Provider).exists()).toBeTruthy();
  expect(wrapper.find(ListSpacingContext.Provider).prop('value')).toBe(false);
});
