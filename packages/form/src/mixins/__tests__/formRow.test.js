import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import formRow from '../formRow';

function Foo({ children }) {
    return <div>{children}</div>;
}

const FormRowFoo = formRow()(Foo);

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <FormRowFoo />;

    ReactDOM.render(element, div);
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
            errorMsg="bar" />
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
