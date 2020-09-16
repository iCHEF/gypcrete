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

it('reads options only from <SelectOptions>', () => {
  const wrapper = shallow(
    <SelectList value="foo">
      <Option label="Foo" value="foo" />
      <Option label="Bar" value="bar" />
      <div />
    </SelectList>
  );

  const readOptions = wrapper.instance().getOptions();

  expect(readOptions).toHaveLength(2);
  expect(readOptions[0].value).toBe('foo');
  expect(readOptions[1].value).toBe('bar');
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

    wrapper.find('SelectOption[value="foo"]').simulate('change', 'foo', true);
    expect(handleChange).toHaveBeenLastCalledWith('foo');

    wrapper.find('SelectOption[value="bar"]').simulate('change', 'bar', true);
    expect(handleChange).toHaveBeenLastCalledWith('bar');
  });

  it('keeps one option checked when uncontrolled', () => {
    const wrapper = shallow(
      <SelectList>
        <Option label="Foo" value="foo" />
        <Option label="Bar" value="bar" />
      </SelectList>
    );
    expect(wrapper.instance().getValues()).toEqual([]);

    wrapper.find('SelectOption[value="foo"]').simulate('change', 'foo', true);
    expect(wrapper.find('SelectOption[value="foo"]').prop('checked')).toBeTruthy();
    expect(wrapper.instance().getValues()).toEqual(['foo']);

    wrapper.find('SelectOption[value="bar"]').simulate('change', 'bar', true);
    expect(wrapper.find('SelectOption[value="bar"]').prop('checked')).toBeTruthy();
    expect(wrapper.instance().getValues()).toEqual(['bar']);

    wrapper.find('SelectOption[value="bar"]').simulate('change', 'bar', false);
    expect(wrapper.find('SelectOption[value="bar"]').prop('checked')).toBeTruthy();
    expect(wrapper.instance().getValues()).toEqual(['bar']);
  });

  it('does not update options checked state when controlled', () => {
    const wrapper = shallow(
      <SelectList value="foo">
        <Option label="Foo" value="foo" />
        <Option label="Bar" value="bar" />
      </SelectList>
    );
    expect(wrapper.instance().getValues()).toEqual(['foo']);

    wrapper.find('SelectOption[value="bar"]').simulate('change', 'bar', true);
    expect(wrapper.find('SelectOption[value="bar"]').prop('checked')).toBeFalsy();
    expect(wrapper.instance().getValues()).toEqual(['foo']);
  });

  it('updates <Option checked> if is controlled and values changes', () => {
    const wrapper = shallow(
      <SelectList value="foo">
        <Option label="Foo" value="foo" />
        <Option label="Bar" value="bar" />
      </SelectList>
    );
    expect(wrapper.find('SelectOption[value="foo"]').prop('checked')).toBeTruthy();
    expect(wrapper.find('SelectOption[value="bar"]').prop('checked')).toBeFalsy();

    wrapper.setProps({ value: 'bar' });
    expect(wrapper.find('SelectOption[value="foo"]').prop('checked')).toBeFalsy();
    expect(wrapper.find('SelectOption[value="bar"]').prop('checked')).toBeTruthy();
  });

  it('does not update <Option checked> if is uncontrolled and other prop changes', () => {
    const wrapper = shallow(
      <SelectList defaultValue="foo">
        <Option label="Foo" value="foo" />
        <Option label="Bar" value="bar" />
      </SelectList>
    );
    expect(wrapper.find('SelectOption[value="foo"]').prop('checked')).toBeTruthy();
    expect(wrapper.find('SelectOption[value="bar"]').prop('checked')).toBeFalsy();

    wrapper.setProps({ defaultValue: ['bar'] });
    expect(wrapper.find('SelectOption[value="foo"]').prop('checked')).toBeTruthy();
    expect(wrapper.find('SelectOption[value="bar"]').prop('checked')).toBeFalsy();
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

    expect(wrapper.find(Option).at(0).props()).toMatchObject({
      label: 'All',
      value: null,
      onChange: wrapper.instance().handleCheckAllOptionChange,
    });

    wrapper.setProps({ checkAllLabel: 'Check All' });
    expect(wrapper.find(Option).at(0).prop('label')).toBe('Check All');
  });

  it('should not renders the "All" option if showCheckAll is false', () => {
    const wrapper = shallow(
      <SelectList multiple showCheckAll={false}>
        <Option label="Foo" value="foo" />
        <Option label="Bar" value="bar" />
      </SelectList>
    );

    expect(wrapper.find(Option).at(0).props()).toMatchObject({
      label: 'Foo',
      value: 'foo',
    });
  });

  it('triggers onChange with sorted values', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <SelectList multiple onChange={handleChange}>
        <Option label="Foo" value="foo" />
        <Option label="Bar" value="bar" />
        <Option label="Meh" value="meh" />
      </SelectList>
    );
    expect(handleChange).not.toHaveBeenCalled();

    wrapper.find('SelectOption[value="meh"]').simulate('change', 'meh', true);
    expect(handleChange).toHaveBeenLastCalledWith(['meh']);

    wrapper.find('SelectOption[value="bar"]').simulate('change', 'bar', true);
    expect(handleChange).toHaveBeenLastCalledWith(['bar', 'meh']);

    wrapper.find('SelectOption[value="foo"]').simulate('change', 'foo', true);
    expect(handleChange).toHaveBeenLastCalledWith(['foo', 'bar', 'meh']);

    wrapper.find('SelectOption[value="bar"]').simulate('change', 'bar', false);
    expect(handleChange).toHaveBeenLastCalledWith(['foo', 'meh']);
  });

  it('can toggle all options at once', () => {
    const wrapper = shallow(
      <SelectList multiple>
        <Option label="Foo" value="foo" />
        <Option label="Bar" value="bar" />
      </SelectList>
    );
    expect(wrapper.instance().getValues()).toEqual([]);

    wrapper.find(Option).at(0).simulate('change', null, true);
    expect(wrapper.instance().getValues()).toEqual(['foo', 'bar']);

    wrapper.find(Option).at(0).simulate('change', null, false);
    expect(wrapper.instance().getValues()).toEqual([]);
  });
});

describe('Read-only options', () => {
  it('toggles all options without affecting read-only options', () => {
    const wrapper = shallow(
      <SelectList multiple defaultValue={['foo']}>
        <Option label="Foo" value="foo" readOnly />
        <Option label="Bar" value="bar" />
      </SelectList>
    );
    expect(wrapper.instance().getValues()).toEqual(['foo']);

    wrapper.find(Option).at(0).simulate('change', null, true);
    expect(wrapper.instance().getValues()).toEqual(['foo', 'bar']);

    wrapper.find(Option).at(0).simulate('change', null, false);
    expect(wrapper.instance().getValues()).toEqual(['foo']);
  });
});

describe('Minimum checks limit', () => {
  it('does not allow to uncheck if will unable to match minCheck', () => {
    const wrapper = shallow(
      <SelectList multiple minCheck={1} defaultValue={['foo']}>
        <Option label="Foo" value="foo" />
        <Option label="Bar" value="bar" />
      </SelectList>
    );
    expect(wrapper.instance().getValues()).toEqual(['foo']);

    wrapper.find('SelectOption[value="bar"]').simulate('change', 'bar', true);
    expect(wrapper.instance().getValues()).toEqual(['foo', 'bar']);

    wrapper.find('SelectOption[value="foo"]').simulate('change', 'foo', false);
    expect(wrapper.instance().getValues()).toEqual(['bar']);

    wrapper.find('SelectOption[value="bar"]').simulate('change', 'bar', false);
    expect(wrapper.instance().getValues()).toEqual(['bar']);
  });

  it('keeps first n-options checked when unchecking all options', () => {
    const wrapper = shallow(
      <SelectList multiple minCheck={2} defaultValue={['foo', 'option3']}>
        <Option label="Foo" value="foo" />
        <Option label="Bar" value="bar" />
        <Option label="Option3" value="option3" />
      </SelectList>
    );
    expect(wrapper.instance().getValues()).toEqual(['foo', 'option3']);

    wrapper.find(Option).at(0).simulate('change', null, true);
    expect(wrapper.instance().getValues()).toEqual(['foo', 'bar', 'option3']);

    wrapper.find(Option).at(0).simulate('change', null, false);
    expect(wrapper.instance().getValues()).toEqual(['foo', 'bar']);
  });
});

it('if change `multiple` prop when uncontrolled, it will auto reset cachedValue', () => {
  const wrapper = shallow(
    <SelectList defaultValue="foo">
      <Option label="Option A" value="foo" />
      <Option label="Option B" value="bar" />
    </SelectList>
  );
  expect(wrapper.instance().getValues()).toEqual(['foo']);

  wrapper.setProps({ multiple: true, defaultValue: ['foo', 'bar'] });
  expect(wrapper.instance().getValues()).toEqual([]);

  wrapper.setProps({ multiple: false, defaultValue: ['bar'] });
  expect(wrapper.instance().getValues()).toEqual([]);
});
