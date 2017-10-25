import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import {
    Button,
    Text,
    TextLabel,
} from '@ichef/gypcrete';

import SelectRow, { PureSelectRow, Popover } from '../SelectRow';
import SelectList from '../SelectList';
import Option from '../SelectOption';

describe('formRow(SelectRow)', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = (
            <SelectRow label="Select">
                <Option label="Option A" value="a" />
                <Option label="Option B" value="b" />
                <Option label="Option C" value="c" />
            </SelectRow>
        );

        ReactDOM.render(element, div);
    });
});

describe('Pure <SelectRow>', () => {
    it('renders a <Button> if the row is editable', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" />
        );

        expect(wrapper.find(Button).exists()).toBeTruthy();
        expect(wrapper.find(TextLabel).exists()).toBeFalsy();
    });

    it('renders a <TextLabel> if the row is not editable', () => {
        const wrapper = shallow(
            <PureSelectRow ineditable label="Select" />
        );

        expect(wrapper.find(Button).exists()).toBeFalsy();
        expect(wrapper.find(TextLabel).exists()).toBeTruthy();
    });

    it('renders an anchored <Popover> with a <SelectList> when click on <Button>', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" />
        );
        expect(wrapper.find(Popover).exists()).toBeFalsy();
        expect(wrapper.state('popoverOpen')).toBeFalsy();

        expect(wrapper.find(Button).simulate('click'));
        expect(wrapper.find(Popover).exists()).toBeTruthy();
        expect(wrapper.state('popoverOpen')).toBeTruthy();

        expect(wrapper.find(Popover).find(SelectList).exists()).toBeTruthy();
    });

    it('removed <Popover> when it requests close', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" />
        );
        wrapper.setState({ popoverOpen: true });
        expect(wrapper.find(Popover).exists()).toBeTruthy();

        wrapper.find(Popover).simulate('close');
        wrapper.setState({ popoverOpen: false });
        expect(wrapper.find(Popover).exists()).toBeFalsy();
    });

    it('passes children to <SelectList> inside <Popover>', () => {
        const element = (
            <PureSelectRow label="Select">
                <Option label="foo" />
            </PureSelectRow>
        );
        const wrapper = shallow(element);
        wrapper.setState({ popoverOpen: true });

        expect(element.props.children)
            .toEqual(wrapper.find(SelectList).prop('children'));
    });
});
