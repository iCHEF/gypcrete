import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import {
    Avatar,
    Button,
    Popover,
    Text,
    TextLabel,
} from '@ichef/gypcrete';

import SelectRow, { PureSelectRow, BEM } from '../SelectRow';
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

describe('Pure <SelectRow>: UI', () => {
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
        expect(wrapper.state('isPopoverOpen')).toBeFalsy();

        expect(wrapper.find(Button).simulate('click'));
        expect(wrapper.find(Popover).exists()).toBeTruthy();
        expect(wrapper.state('isPopoverOpen')).toBeTruthy();

        expect(wrapper.find(Popover).find(SelectList).exists()).toBeTruthy();
    });

    it('removes <Popover> when it requests close', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" />
        );
        wrapper.setState({ isPopoverOpen: true });
        expect(wrapper.find(Popover).exists()).toBeTruthy();

        wrapper.find(Popover).simulate('close');
        wrapper.setState({ isPopoverOpen: false });
        expect(wrapper.find(Popover).exists()).toBeFalsy();
    });

    it('removes <Popover> when value change under single-select mode', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" />
        );

        // Single-select mode: auto close Popover
        expect(wrapper.find(Button).simulate('click'));
        expect(wrapper.find(Popover).exists()).toBeTruthy();

        wrapper.find(SelectList).simulate('change', [1]);
        expect(wrapper.find(Popover).exists()).toBeFalsy();

        // Multi-select mode: Popover remains
        wrapper.setProps({ multiple: true });

        expect(wrapper.find(Button).simulate('click'));
        expect(wrapper.find(Popover).exists()).toBeTruthy();

        wrapper.find(SelectList).simulate('change', [2]);
        expect(wrapper.find(Popover).exists()).toBeTruthy();
    });

    it('passes children to <SelectList> inside <Popover>', () => {
        const element = (
            <PureSelectRow label="Select">
                <Option label="foo" />
            </PureSelectRow>
        );
        const wrapper = shallow(element);
        wrapper.setState({ isPopoverOpen: true });

        expect(element.props.children)
            .toEqual(wrapper.find(SelectList).prop('children'));
    });
});

describe('Pure <SelectRow>: Data', () => {
    it('caches selected value from <SelectList> when uncontrolled', () => {
        const wrapper = shallow(
            <PureSelectRow multiple label="Select" />
        );
        wrapper.setState({ isPopoverOpen: true });
        wrapper.find(SelectList).simulate('change', [1, 2]);
        expect(wrapper.state('cachedValue')).toEqual([1, 2]);
    });

    it('does not cache value from <SelectList> when controlled', () => {
        const wrapper = shallow(
            <PureSelectRow multiple label="Select" value={[1]} />
        );
        wrapper.setState({ isPopoverOpen: true });
        expect(wrapper.state('cachedValue')).toEqual([1]);

        wrapper.find(SelectList).simulate('change', [1, 2]);
        expect(wrapper.state('cachedValue')).toEqual([1]);
    });

    it('updates cached value from props when controlled', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" value={1} />
        );
        expect(wrapper.state('cachedValue')).toEqual(1);

        wrapper.setProps({ multiple: true, value: [1, 2] });
        expect(wrapper.state('cachedValue')).toEqual([1, 2]);
    });

    it('if change `multiple` prop when uncontrolled, it will auto reset cachedValue', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" defaultValue={1} />
        );
        expect(wrapper.state('cachedValue')).toEqual(1);

        wrapper.setProps({ multiple: true, defaultValue: [1, 2] });
        expect(wrapper.state('cachedValue')).toEqual([]);

        wrapper.setProps({ multiple: false, defaultValue: 87 });
        expect(wrapper.state('cachedValue')).toEqual(null);
    });

    it('controls <SelectList> with cached value', () => {
        const wrapper = shallow(<PureSelectRow label="Select" />);
        wrapper.setState({
            cachedValue: 1,
            isPopoverOpen: true,
        });
        expect(wrapper.find(SelectList).prop('value')).toEqual(1);

        wrapper.setProps({ multiple: true });
        wrapper.setState({ cachedValue: [1, 2, 3] });
        expect(wrapper.find(SelectList).prop('value')).toEqual([1, 2, 3]);
    });

    it('renders current value on aside', () => {
        const wrapper = shallow(
            <PureSelectRow multiple label="Select" value={[]}>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
                <Option label="Meh" value="meh" />
            </PureSelectRow>
        );
        expect(wrapper.find(Text).prop('aside'))
            .toEqual(<span className={BEM.placeholder.toString()}>(Unset)</span>);

        wrapper.setProps({ value: ['foo', 'bar'] });
        expect(wrapper.find(Text).prop('aside')).toBe('Foo, Bar');

        wrapper.setProps({ value: ['foo', 'bar', 'meh'] });
        expect(wrapper.find(Text).prop('aside')).toBe('All');
    });

    it('renders the avatar', () => {
        const fooAvatar = <Avatar alt="foo" src="FOO_SRC" />;
        const barAvatar = <Avatar alt="bar" src="BAR_SRC" />;

        const wrapper = shallow(
            <PureSelectRow label="Select" value="foo">
                <Option label="foo" value="foo" avatar={fooAvatar} />
                <Option label="bar" value="bar" avatar={barAvatar} />
            </PureSelectRow>
        );

        expect(wrapper.find(Avatar).prop('src')).toEqual('FOO_SRC');

        wrapper.setProps({ value: 'bar' });
        expect(wrapper.find(Avatar).prop('src')).toEqual('BAR_SRC');
    });

    it('can customize aside labels', () => {
        const wrapper = shallow(
            <PureSelectRow multiple label="Select" value={[]} asideNoneLabel="None">
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
                <Option label="Meh" value="meh" />
            </PureSelectRow>
        );

        expect(wrapper.find(Text).prop('aside'))
            .toEqual(<span className={BEM.placeholder.toString()}>None</span>);

        wrapper.setProps({
            value: ['foo', 'bar'],
            asideSeparator: ' + '
        });
        expect(wrapper.find(Text).prop('aside')).toBe('Foo + Bar');

        wrapper.setProps({
            value: ['foo', 'bar', 'meh'],
            asideAllLabel: 'Everything'
        });
        expect(wrapper.find(Text).prop('aside')).toBe('Everything');
    });

    it('can disable "All" label by overriding with null', () => {
        const wrapper = shallow(
            <PureSelectRow
                multiple
                label="Select"
                asideAllLabel={null}
                value={['foo', 'bar', 'meh']}>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
                <Option label="Meh" value="meh" />
            </PureSelectRow>
        );
        expect(wrapper.find(Text).prop('aside')).toBe('Foo, Bar, Meh');
    });

    it('does not display "All" on single <SelectRow> with only one option', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" value="foo">
                <Option label="Foo" value="foo" />
            </PureSelectRow>
        );
        expect(wrapper.find(Text).prop('aside')).toBe('Foo');
    });
});
