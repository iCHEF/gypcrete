import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import StatusIcon from 'src/StatusIcon';
import Text from '../Text';
import BasicRow from '../BasicRow';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <Text
            align="right"
            basic="Basic text"
            aside="Aside text"
            tag="Tag" />
    );

    ReactDOM.render(element, div);
});

it('renders using <BasicRow> with BEM className', () => {
    const wrapper = shallow(<Text basic="text" />);
    const rowWrapper = wrapper.find(BasicRow);

    expect(wrapper.children()).toHaveLength(1);
    expect(rowWrapper.exists()).toBeTruthy();
    expect(rowWrapper.hasClass('ic-text__row')).toBeTruthy();
    expect(rowWrapper.hasClass('ic-text__basic')).toBeTruthy();
});

it('passing "basic", "tag" and "statusIcon" to <BasicRow>', () => {
    const icon = <StatusIcon status="loading" />;
    const wrapper = shallow(
        <Text
            basic="Basic text"
            tag="Tag"
            statusIcon={icon} />
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
        <Text
            basic="Basic text"
            tag="Tag"
            statusIcon={icon}
            basicRow={customRow} />
    );
    const rowWrapper = wrapper.find(FooRow);

    expect(rowWrapper.prop('basic')).toBe('Basic text');
    expect(rowWrapper.prop('tag')).toBe('Tag');
    expect(rowWrapper.prop('statusIcon')).toEqual(icon);
});

it('renders aside text', () => {
    const wrapper = shallow(<Text basic="Basic" aside="Aside" />);

    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(1).hasClass('ic-text__aside')).toBeTruthy();
    expect(wrapper.childAt(1).text()).toBe('Aside');
});
