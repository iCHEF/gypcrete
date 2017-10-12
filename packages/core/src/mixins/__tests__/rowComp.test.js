import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Icon from 'src/Icon';
import Text from 'src/Text';

import rowComp from '../rowComp';

function Foo({ children }) {
    return <div>{children}</div>;
}

const RowCompFoo = rowComp()(Foo);

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <RowCompFoo />;

    ReactDOM.render(element, div);
});

it('renders <Text> into wrapped component', () => {
    const wrapper = shallow(
        <RowCompFoo
            bold
            basic="Basic text"
            tag="Tag"
            aside="Aside text" />
    );
    const textWrapper = wrapper.find(Foo).shallow().find(Text);

    expect(textWrapper.exists()).toBeTruthy();
    expect(textWrapper.prop('bold')).toBeTruthy();
    expect(textWrapper.prop('basic')).toBe('Basic text');
    expect(textWrapper.prop('tag')).toBe('Tag');
    expect(textWrapper.prop('aside')).toBe('Aside text');
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

it('renders <Text> with adjusted alignment', () => {
    const leftWrapper = shallow(<RowCompFoo align="left" basic="Basic" />);
    const centerWrapper = shallow(<RowCompFoo align="center" basic="Basic" />);
    const centerIconWrapper = shallow(<RowCompFoo align="center" basic="Basic" icon="add" />);
    const rightWrapper = shallow(<RowCompFoo align="right" basic="Basic" />);
    const reverseWrapper = shallow(<RowCompFoo align="reverse" basic="Basic" />);

    expect(
        leftWrapper
            .find(Foo).shallow()
            .find(Text).prop('align')
    ).toBe('left');

    expect(
        centerWrapper
            .find(Foo).shallow()
            .find(Text).prop('align')
    ).toBe('center');

    expect(
        centerIconWrapper
            .find(Foo).shallow()
            .find(Text).prop('align')
    ).toBe('left');

    expect(
        rightWrapper
            .find(Foo).shallow()
            .find(Text).prop('align')
    ).toBe('right');

    expect(
        reverseWrapper
            .find(Foo).shallow()
            .find(Text).prop('align')
    ).toBe('right');
});

it('passes down other props to wrapped component', () => {
    const wrapper = shallow(
        <RowCompFoo basic="Basic" bar />
    );

    expect(wrapper.find(Foo).prop('bar')).toBeTruthy();
});

it('takes defaults to its <RowComp> wrapper-component', () => {
    const Comp = rowComp({ defaultAlign: 'center', defaultMinified: true })(Foo);

    expect(Comp.defaultProps.align).toBe('center');
    expect(Comp.defaultProps.minified).toBeTruthy();
});
