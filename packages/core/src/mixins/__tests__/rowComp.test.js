import React from 'react';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';

import Icon from 'src/Icon';
import Text from 'src/Text';

import rowComp from '../rowComp';

function Foo({ children }) {
  return <div>{children}</div>;
}

const RowCompFoo = rowComp()(Foo);

it('renders without crashing', () => {
  const element = <RowCompFoo />;

  render(element);
});

it('renders <Text> into wrapped component', () => {
  const wrapper = shallow(
    <RowCompFoo
      bold
      verticalOrder="reverse"
      basic="Basic text"
      tag="Tag"
      aside="Aside text"
    />
  );
  const textWrapper = wrapper.find(Foo).shallow().find(Text);

  expect(textWrapper.exists()).toBeTruthy();
  expect(textWrapper.props()).toMatchObject({
    verticalOrder: 'reverse',
    basic: 'Basic text',
    aside: 'Aside text',
    tag: 'Tag',
    bold: true,
  });
});

it('renders <Icon> and <Text> into wrapped component', () => {
  const wrapper = shallow(
    <RowCompFoo icon="printer" basic="Basic" />
  );
  const fooWrapper = wrapper.find(Foo).shallow();

  expect(fooWrapper.find(Icon).exists()).toBeTruthy();
  expect(fooWrapper.find(Icon).prop('type')).toBe('printer');

  expect(fooWrapper.find(Text).exists()).toBeTruthy();
  expect(fooWrapper.find(Text).prop('basic')).toBe('Basic');
});

it('takes a React Element as icon', () => {
  const icon = <span data-foo="bar" />;
  const wrapper = shallow(<RowCompFoo icon={icon} basic="Basic" />);
  const fooWrapper = wrapper.find(Foo).shallow();

  expect(fooWrapper.find(Icon).exists()).toBeFalsy();
  expect(fooWrapper.find('[data-foo]')).toHaveLength(1);
});

describe('it renders <Text> with adjusted alignment', () => {
  test('left-aligned', () => {
    const wrapper = shallow(<RowCompFoo align="left" basic="Basic" />);
    expect(wrapper.find(Text).props()).toMatchObject({
      align: 'left',
      noGrow: false,
    });
  });

  test('center-aligned', () => {
    const wrapper = shallow(<RowCompFoo align="center" basic="Basic" />);
    expect(wrapper.find(Text).props()).toMatchObject({
      align: 'center',
      noGrow: true,
    });
  });

  test('center-aligned with Icon', () => {
    const wrapper = shallow(<RowCompFoo align="center" icon="add" basic="Basic" />);
    expect(wrapper.find(Text).props()).toMatchObject({
      align: 'left',
      noGrow: true,
    });
  });

  test('right-aligned', () => {
    const wrapper = shallow(<RowCompFoo align="right" basic="Basic" />);
    expect(wrapper.find(Text).props()).toMatchObject({
      align: 'right',
      noGrow: false,
    });
  });

  test('reverse-aligned', () => {
    const wrapper = shallow(<RowCompFoo align="reverse" basic="Basic" />);
    expect(wrapper.find(Text).props()).toMatchObject({
      align: 'right',
      noGrow: false,
    });
  });
});

it('passes down other props to wrapped component', () => {
  const wrapper = shallow(
    <RowCompFoo basic="Basic" bar />
  );

  expect(wrapper.find(Foo).prop('bar')).toBeTruthy();
});

it('holds context for children components', () => {
  const wrapper = shallow(
    <RowCompFoo
      align="right"
      status="success"
      statusOptions={{ autoHide: true }}
      errorMsg="foo-bar"
    />
  );
  const context = wrapper.instance().getChildContext();

  expect(context).toMatchObject({
    status: 'success',
    statusOptions: { autoHide: true },
    errorMsg: 'foo-bar',
    textProps: {
      align: 'right',
      basic: null,
      aside: null,
      tag: null,
      bold: false,
      noGrow: false,
      verticalOrder: 'normal',
    },
  });
});

it('takes defaults to its <RowComp> wrapper-component', () => {
  const Comp = rowComp({ defaultAlign: 'center', defaultMinified: true })(Foo);

  expect(Comp.defaultProps.align).toBe('center');
  expect(Comp.defaultProps.minified).toBeTruthy();
});

it('pass down disabled prop to wrapped component', () => {
  const Input = ({ children, ...props }) => <input {...props} />;
  const RowInput = rowComp()(Input);

  render(<RowInput disabled />);

  const wrapper = screen.getByRole('textbox');

  expect(wrapper).toHaveAttribute('disabled');
});
