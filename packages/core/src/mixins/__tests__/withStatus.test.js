import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import StatusIcon from 'src/StatusIcon';

import withStatus, { withStatusPropTypes } from '../withStatus';

function Foo({ statusIcon, errorMsg }) {
  return (
    <div>
      {statusIcon}
      <span>{errorMsg}</span>
    </div>
  );
}
Foo.propTypes = {
  ...withStatusPropTypes,
};

// eslint-disable-next-line react/prefer-stateless-function
class Bar extends PureComponent {
  render() {
    return <div />;
  }
}

const FooWithStatus = withStatus()(Foo);
const FooWithStatusOptions = withStatus({ autohide: false })(Foo);
const FooWithRawStatus = withStatus({ withRawStatus: true })(Foo);
const BarWithRef = withStatus({ withRef: true })(Bar);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <FooWithStatus />;

  ReactDOM.render(element, div);
});

it('renders <StatusIcon> from context and passes to wrapped component', () => {
  const wrapper = shallow(
    <FooWithStatus />,
    {
      context: {
        status: 'loading',
        statusOptions: { position: 'corner' },
      },
    }
  );
  const iconWrapper = wrapper.find(Foo).shallow().find(StatusIcon);

  expect(iconWrapper.exists()).toBeTruthy();
  expect(iconWrapper.prop('status')).toBe('loading');
  expect(iconWrapper.prop('position')).toBe('corner');
});

it('renders <StatusIcon> with default options', () => {
  const wrapper = shallow(
    <FooWithStatusOptions />,
    { context: { status: 'success' } }
  );
  const iconWrapper = wrapper.find(Foo).shallow().find(StatusIcon);

  expect(iconWrapper.exists()).toBeTruthy();
  expect(iconWrapper.prop('status')).toBe('success');
  expect(iconWrapper.prop('autohide')).toBeFalsy();
});

it('passes down "errorMsg" to wrapped component', () => {
  const wrapper = shallow(
    <FooWithStatus />,
    { context: { status: 'error', errorMsg: 'Just error' } }
  );

  expect(wrapper.find(Foo).shallow().text()).toBe('<StatusIcon />Just error');
});

it('passes down other props to wrapped component', () => {
  const wrapper = shallow(
    <FooWithStatus bar />,
    { context: {} }
  );

  expect(wrapper.find(Foo).prop('bar')).toBeTruthy();
});

it('can hold ref to the rendered component, and can be retrieved', () => {
  const wrapper = mount(<BarWithRef />);
  const ref = wrapper.instance().getRenderedComponent();

  expect(ref).not.toBeNull();
  expect(ref).toBeInstanceOf(Bar);
});

it('can optionally pass down raw status string from context to component', () => {
  const wrapper = shallow(
    <FooWithRawStatus />,
    { context: { status: 'loading' } },
  );

  expect(wrapper.find(Foo).prop('status')).toBe('loading');
});
