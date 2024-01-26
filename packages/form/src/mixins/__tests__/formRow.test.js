import React, { PureComponent } from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';

import formRow from '../formRow';

function Foo({ children }) {
  return <div>{children}</div>;
}
const FormRowFoo = formRow()(Foo);

// eslint-disable-next-line react/prefer-stateless-function
class Bar extends PureComponent {
  render() {
    return <div>bar</div>;
  }
}
const FormRowBarWithRef = formRow({ withRef: true })(Bar);

it('renders without crashing', () => {
  const element = <FormRowFoo />;

  render(element);
});

it('passes ineditable prop to wrapped component', () => {
  const wrapper = shallow(<FormRowFoo />);

  expect(wrapper.find(Foo).props()).toMatchObject({
    ineditable: false,
    disabled: false,
    readOnly: false,
  });

  wrapper.setProps({ disabled: true, readOnly: false });
  expect(wrapper.find(Foo).props()).toMatchObject({
    ineditable: true,
    disabled: true,
    readOnly: false,
  });

  wrapper.setProps({ disabled: false, readOnly: true });
  expect(wrapper.find(Foo).props()).toMatchObject({
    ineditable: true,
    disabled: false,
    readOnly: true,
  });
});

it('passes a collected rowProps prop to wrapped component', () => {
  const wrapper = shallow(
    <FormRowFoo
      desc="foo"
      status="error"
      statusOptions={{ autoHide: false }}
      errorMsg="bar"
    />
  );
  const fooProps = wrapper.find(Foo).props();

  expect(fooProps).not.toHaveProperty('desc');
  expect(fooProps).not.toHaveProperty('status');
  expect(fooProps).not.toHaveProperty('statusOptions');
  expect(fooProps).not.toHaveProperty('errorMsg');

  expect(fooProps.rowProps).toMatchObject({
    desc: 'foo',
    status: 'error',
    statusOptions: { autoHide: false },
    errorMsg: 'bar',
  });
});


it('passes a custom rowProps prop to wrapped component', () => {
  const wrapper = shallow(
    <FormRowFoo
      desc="foo"
      rowProps={{
        status: 'success',
      }}
      status="error"
      errorMsg="bar"
    />
  );
  const fooProps = wrapper.find(Foo).props();

  expect(fooProps).not.toHaveProperty('desc');
  expect(fooProps).not.toHaveProperty('status');
  expect(fooProps).not.toHaveProperty('errorMsg');

  expect(fooProps.rowProps).toMatchObject({
    desc: 'foo',
    status: 'success',
    errorMsg: 'bar',
  });
});


it('can optionally keep a ref to wrapped component', () => {
  const wrapper = mount(<FormRowBarWithRef />);

  expect(wrapper.instance().getWrappedComponent()).toBeInstanceOf(Bar);
});
