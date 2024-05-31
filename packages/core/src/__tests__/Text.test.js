import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import BasicRow from '../BasicRow';
import StatusIcon from '../StatusIcon';
import Text, { PureText } from '../Text';

describe('<withStatus(Text)>', () => {
  it('renders without crashing', () => {
    const element = (
      <Text
        align="right"
        basic="Basic text"
        aside="Aside text"
        tag="Tag"
      />
    );

    render(element);
  });

  it('works with withStatus() mixin', () => {
    const wrapper = shallow(<Text basic="Foo" />, {
      context: { status: 'error', errorMsg: 'bar' },
    });

    expect(wrapper.prop('statusIcon').type).toBe(StatusIcon);
    expect(wrapper.prop('errorMsg')).toBe('bar');
  });
});

describe('Pure <Text>', () => {
  it('renders using <BasicRow> with BEM className', () => {
    const wrapper = shallow(<PureText basic="text" />);
    const rowWrapper = wrapper.find(BasicRow);

    expect(wrapper.children()).toHaveLength(1);
    expect(rowWrapper.exists()).toBeTruthy();
    expect(rowWrapper.hasClass('gyp-text__row')).toBeTruthy();
    expect(rowWrapper.hasClass('gyp-text__basic')).toBeTruthy();
  });

  it('passing "basic", "tag" and "statusIcon" to <BasicRow>', () => {
    const icon = <StatusIcon status="loading" />;
    const wrapper = shallow(
      <PureText
        basic="Basic text"
        tag="Tag"
        statusIcon={icon}
      />,
    );
    const rowWrapper = wrapper.find(BasicRow);

    expect(rowWrapper.prop('basic')).toBe('Basic text');
    expect(rowWrapper.prop('tag')).toBe('Tag');
    expect(rowWrapper.prop('statusIcon')).toEqual(icon);
  });

  it('takes custom <BasicRow> and passes the same props to it', () => {
    const FooRow = () => <div />;

    const customRow = <FooRow />;
    const icon = <StatusIcon status="loading" />;

    const wrapper = shallow(
      <PureText
        basic="Basic text"
        tag="Tag"
        statusIcon={icon}
        basicRow={customRow}
      />,
    );
    const rowWrapper = wrapper.find(FooRow);

    expect(rowWrapper.prop('basic')).toBe('Basic text');
    expect(rowWrapper.prop('tag')).toBe('Tag');
    expect(rowWrapper.prop('statusIcon')).toEqual(icon);
  });

  it('does not render <BasicRow> if basicRow is overriden with null', () => {
    const wrapper = shallow(<PureText basicRow={null} />);

    expect(wrapper.find(BasicRow).exists()).toBeFalsy();
  });

  it('renders aside text', () => {
    const wrapper = shallow(
      <PureText
        basic="Basic"
        aside="Aside"
      />,
    );

    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(1).hasClass('gyp-text__aside')).toBeTruthy();
    expect(wrapper.childAt(1).text()).toBe('Aside');
  });

  it('renders errorMsg and ignores aside text', () => {
    const wrapper = shallow(<PureText errorMsg="Error" />);

    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(1).text()).toBe('Error');

    wrapper.setProps({ aside: 'Aside' });
    expect(wrapper.childAt(1).text()).toBe('Error');
  });

  it('can render in bold mode', () => {
    const wrapper = shallow(
      <PureText
        bold
        basic="foo"
      />,
    );

    expect(wrapper.hasClass('gyp-text--bold')).toBeTruthy();
  });

  it('can render in vertical-order reverse mode', () => {
    const wrapper = shallow(<PureText basic="foo" />);
    expect(wrapper.hasClass('gyp-text--v-normal')).toBeTruthy();

    wrapper.setProps({ verticalOrder: 'reverse' });
    expect(wrapper.hasClass('gyp-text--v-reverse')).toBeTruthy();
  });
});
