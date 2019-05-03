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
        expect(wrapper.state('popoverOpen')).toBeFalsy();

        expect(wrapper.find(Button).simulate('click'));
        expect(wrapper.find(Popover).exists()).toBeTruthy();
        expect(wrapper.state('popoverOpen')).toBeTruthy();

        expect(wrapper.find(Popover).find(SelectList).exists()).toBeTruthy();
    });

    it('removes <Popover> when it requests close', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" />
        );
        wrapper.setState({ popoverOpen: true });
        expect(wrapper.find(Popover).exists()).toBeTruthy();

        wrapper.find(Popover).simulate('close');
        wrapper.setState({ popoverOpen: false });
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
        wrapper.setState({ popoverOpen: true });

        expect(element.props.children)
            .toEqual(wrapper.find(SelectList).prop('children'));
    });
});

describe('Pure <SelectRow>: Data', () => {
    it('caches selected values from <SelectList> when uncontrolled', () => {
        const wrapper = shallow(
            <PureSelectRow multiple label="Select" />
        );
        wrapper.setState({ popoverOpen: true });
        expect(wrapper.state('cachedValues')).toEqual([]);

        wrapper.find(SelectList).simulate('change', [1, 2]);
        expect(wrapper.state('cachedValues')).toEqual([1, 2]);
    });

    it('does not cache values from <SelectList> when controlled', () => {
        const wrapper = shallow(
            <PureSelectRow multiple label="Select" values={[1]} />
        );
        wrapper.setState({ popoverOpen: true });
        expect(wrapper.state('cachedValues')).toEqual([1]);

        wrapper.find(SelectList).simulate('change', [1, 2]);
        expect(wrapper.state('cachedValues')).toEqual([1]);
    });

    it('updates cached values from props when controlled', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" values={[1]} />
        );
        expect(wrapper.state('cachedValues')).toEqual([1]);

        wrapper.setProps({ values: [1, 2] });
        expect(wrapper.state('cachedValues')).toEqual([1, 2]);
    });

    it('does updates cached values from props when uncontrolled', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" defaultValues={[1]} />
        );
        expect(wrapper.state('cachedValues')).toEqual([1]);

        wrapper.setProps({ defaultValues: [1, 2] });
        expect(wrapper.state('cachedValues')).toEqual([1]);
    });

    it('controls <SelectList> with cached values', () => {
        const wrapper = shallow(<PureSelectRow label="Select" />);
        wrapper.setState({
            cachedValues: [1],
            popoverOpen: true,
        });
        expect(wrapper.find(SelectList).prop('values')).toEqual([1]);

        wrapper.setState({ cachedValues: [1, 2, 3] });
        expect(wrapper.find(SelectList).prop('values')).toEqual([1, 2, 3]);
    });

    it('renders current values on aside', () => {
        const wrapper = shallow(
            <PureSelectRow multiple label="Select" values={[]}>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
                <Option label="Meh" value="meh" />
            </PureSelectRow>
        );
        expect(wrapper.find(Text).prop('aside'))
            .toEqual(<span className={BEM.placeholder.toString()}>(Unset)</span>);

        wrapper.setProps({ values: ['foo', 'bar'] });
        expect(wrapper.find(Text).prop('aside')).toBe('Foo, Bar');

        wrapper.setProps({ values: ['foo', 'bar', 'meh'] });
        expect(wrapper.find(Text).prop('aside')).toBe('All');
    });

    it('renders the avatar', () => {
        const fooAvatar = <Avatar alt="foo" src="FOO_SRC" />;
        const barAvatar = <Avatar alt="bar" src="BAR_SRC" />;

        const wrapper = shallow(
            <PureSelectRow label="Select" values={['foo']}>
                <Option label="foo" value="foo" avatar={fooAvatar} />
                <Option label="bar" value="bar" avatar={barAvatar} />
            </PureSelectRow>
        );

        expect(wrapper.find(Avatar).prop('src')).toEqual('FOO_SRC');

        wrapper.setProps({ values: ['bar'] });
        expect(wrapper.find(Avatar).prop('src')).toEqual('BAR_SRC');
    });

    it('can customize aside labels', () => {
        const wrapper = shallow(
            <PureSelectRow multiple label="Select" values={[]} asideNone="None">
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
                <Option label="Meh" value="meh" />
            </PureSelectRow>
        );

        expect(wrapper.find(Text).prop('aside'))
            .toEqual(<span className={BEM.placeholder.toString()}>None</span>);

        wrapper.setProps({
            values: ['foo', 'bar'],
            asideSeparator: ' + '
        });
        expect(wrapper.find(Text).prop('aside')).toBe('Foo + Bar');

        wrapper.setProps({
            values: ['foo', 'bar', 'meh'],
            asideAll: 'Everything'
        });
        expect(wrapper.find(Text).prop('aside')).toBe('Everything');
    });

    it('can disable "All" label by overriding with null', () => {
        const wrapper = shallow(
            <PureSelectRow
                multiple
                label="Select"
                asideAll={null}
                values={['foo', 'bar', 'meh']}>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
                <Option label="Meh" value="meh" />
            </PureSelectRow>
        );
        expect(wrapper.find(Text).prop('aside')).toBe('Foo, Bar, Meh');
    });

    it('does not display "All" on single <SelectRow> with only one option', () => {
        const wrapper = shallow(
            <PureSelectRow label="Select" values={['foo']}>
                <Option label="Foo" value="foo" />
            </PureSelectRow>
        );
        expect(wrapper.find(Text).prop('aside')).toBe('Foo');
    });
});
