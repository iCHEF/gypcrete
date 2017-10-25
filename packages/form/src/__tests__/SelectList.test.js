import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import SelectList from '../SelectList';
import Option from '../SelectOption';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <SelectList>
            <Option label="Foo" value="foo" />
            <Option label="Bar" value="bar" />
        </SelectList>
    );

    ReactDOM.render(element, div);
});

it('injects props to <SelectOption> in children', () => {
    const wrapper = shallow(
        <SelectList values={['foo']}>
            <Option label="Foo" value="foo" />
            <Option label="Bar" value="bar" />
            <div />
        </SelectList>
    );

    expect(wrapper.find({ value: 'foo' }).props()).toMatchObject({
        checked: true,
        onChange: wrapper.instance().handleOptionChange,
    });

    expect(wrapper.find({ value: 'bar' }).props()).toMatchObject({
        checked: false,
        onChange: wrapper.instance().handleOptionChange,
    });

    expect(wrapper.find('div').props()).not.toMatchObject({
        checked: false,
        onChange: wrapper.instance().handleOptionChange,
    });
});

describe('Single response mode', () => {
    it('triggers onChange() with only one value', () => {
        const handleChange = jest.fn();
        const wrapper = shallow(
            <SelectList onChange={handleChange}>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
            </SelectList>
        );
        expect(handleChange).not.toHaveBeenCalled();

        wrapper.instance().handleOptionChange('foo', true);
        expect(handleChange).toHaveBeenLastCalledWith(['foo']);

        wrapper.instance().handleOptionChange('bar', true);
        expect(handleChange).toHaveBeenLastCalledWith(['bar']);
    });

    it('keeps one option checked when uncontrolled', () => {
        const wrapper = shallow(
            <SelectList>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
            </SelectList>
        );
        expect(wrapper.instance().getValues()).toEqual([]);

        wrapper.instance().handleOptionChange('foo', true);
        expect(wrapper.find({ value: 'foo' }).prop('checked')).toBeTruthy();
        expect(wrapper.instance().getValues()).toEqual(['foo']);

        wrapper.instance().handleOptionChange('bar', true);
        expect(wrapper.find({ value: 'bar' }).prop('checked')).toBeTruthy();
        expect(wrapper.instance().getValues()).toEqual(['bar']);

        wrapper.instance().handleOptionChange('bar', false);
        expect(wrapper.find({ value: 'bar' }).prop('checked')).toBeTruthy();
        expect(wrapper.instance().getValues()).toEqual(['bar']);
    });

    it('updates <Option checked> if is controlled and values changes', () => {
        const wrapper = shallow(
            <SelectList values={['foo']}>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
            </SelectList>
        );
        expect(wrapper.find({ value: 'foo' }).prop('checked')).toBeTruthy();
        expect(wrapper.find({ value: 'bar' }).prop('checked')).toBeFalsy();

        wrapper.setProps({ values: ['bar'] });
        expect(wrapper.find({ value: 'foo' }).prop('checked')).toBeFalsy();
        expect(wrapper.find({ value: 'bar' }).prop('checked')).toBeTruthy();
    });
});

describe('Multiple response mode', () => {
    it('renders an "All" option above any option', () => {
        const wrapper = shallow(
            <SelectList multiple>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
            </SelectList>
        );

        expect(wrapper.find(Option).at(0).prop('onChange'))
            .toBe(wrapper.instance().handleCheckAllOptionChange);
    });

    it('triggers onChange with multiple values', () => {
        const handleChange = jest.fn();
        const wrapper = shallow(
            <SelectList multiple onChange={handleChange}>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
            </SelectList>
        );
        expect(handleChange).not.toHaveBeenCalled();

        wrapper.instance().handleOptionChange('foo', true);
        expect(handleChange).toHaveBeenLastCalledWith(['foo']);

        wrapper.instance().handleOptionChange('bar', true);
        expect(handleChange).toHaveBeenLastCalledWith(['foo', 'bar']);

        wrapper.instance().handleOptionChange('foo', false);
        expect(handleChange).toHaveBeenLastCalledWith(['bar']);
    });

    it('can toggle all options at once', () => {
        const wrapper = shallow(
            <SelectList multiple>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
            </SelectList>
        );
        expect(wrapper.instance().getValues()).toEqual([]);

        wrapper.instance().handleCheckAllOptionChange(null, true);
        expect(wrapper.instance().getValues()).toEqual(['foo', 'bar']);

        wrapper.instance().handleCheckAllOptionChange(null, false);
        expect(wrapper.instance().getValues()).toEqual([]);
    });
});

describe('Read-only options', () => {
    it('toggles all options without affecting read-only options', () => {
        const wrapper = shallow(
            <SelectList multiple defaultValues={['foo']}>
                <Option label="Foo" value="foo" readOnly />
                <Option label="Bar" value="bar" />
            </SelectList>
        );
        expect(wrapper.instance().getValues()).toEqual(['foo']);

        wrapper.instance().handleCheckAllOptionChange(null, true);
        expect(wrapper.instance().getValues()).toEqual(['foo', 'bar']);

        wrapper.instance().handleCheckAllOptionChange(null, false);
        expect(wrapper.instance().getValues()).toEqual(['foo']);
    });
});

describe('Minimum checks limit', () => {
    it('does not allow to uncheck if will unable to match minCheck', () => {
        const wrapper = shallow(
            <SelectList multiple minCheck={1} defaultValues={['foo']}>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
            </SelectList>
        );
        expect(wrapper.instance().getValues()).toEqual(['foo']);

        wrapper.instance().handleOptionChange('bar', true);
        expect(wrapper.instance().getValues()).toEqual(['foo', 'bar']);

        wrapper.instance().handleOptionChange('foo', false);
        expect(wrapper.instance().getValues()).toEqual(['bar']);

        wrapper.instance().handleOptionChange('bar', false);
        expect(wrapper.instance().getValues()).toEqual(['bar']);
    });

    it('keeps first n-options checked when unchecking all options', () => {
        const wrapper = shallow(
            <SelectList multiple minCheck={2} defaultValues={['foo', 'option3']}>
                <Option label="Foo" value="foo" />
                <Option label="Bar" value="bar" />
                <Option label="Option3" value="option3" />
            </SelectList>
        );
        expect(wrapper.instance().getValues()).toEqual(['foo', 'option3']);

        wrapper.instance().handleCheckAllOptionChange(null, true);
        expect(wrapper.instance().getValues()).toEqual(['foo', 'option3', 'bar']);

        wrapper.instance().handleCheckAllOptionChange(null, false);
        expect(wrapper.instance().getValues()).toEqual(['foo', 'bar']);
    });
});
