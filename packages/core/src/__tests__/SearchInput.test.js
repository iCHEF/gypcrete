import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import SearchInput, { PureSearchInput, BEM } from '../SearchInput';

const INNER_VALUE = 'innerValue';
const ON_BLUR_SEARCH_DELAY = 100;

const delay = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

describe('rowComp(SearchInput)', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <SearchInput />;

    ReactDOM.render(element, div);
  });
});

describe('Pure <SearchInput>', () => {
  // UI rendering
  it('renders with an <input type=text> inside', () => {
    const wrapper = shallow(<PureSearchInput />);

    expect(wrapper.find('input').matchesElement(<input type="text" />)).toBeTruthy();
  });

  it('renders reset button when input is not empty', () => {
    const wrapper = shallow(<PureSearchInput />);
    const inputWrapper = wrapper.find('input');

    expect(wrapper.find(`.${BEM.resetBtn}`)).toHaveLength(0);

    inputWrapper.simulate('change', { target: { value: 'foo' } });
    expect(wrapper.find(`.${BEM.resetBtn}`)).toHaveLength(1);
  });

  it('renders loading icon when status is loading', () => {
    const wrapper = shallow(<PureSearchInput />, { context: { status: undefined } });

    expect(wrapper.find('Icon').find({ type: 'loading' })).toHaveLength(0);

    wrapper.setContext({ status: 'loading' });
    expect(wrapper.find('Icon').find({ type: 'loading' })).toHaveLength(1);
  });

  it('hides reset button when status icon is visible', () => {
    const wrapper = shallow(
      <PureSearchInput defaultValue="foo" />,
      { context: { status: undefined } }
    );

    expect(wrapper.find(`.${BEM.resetBtn}`)).toHaveLength(1);

    wrapper.setContext({ status: 'loading' });
    expect(wrapper.find(`.${BEM.resetBtn}`)).toHaveLength(0);
    expect(wrapper.find('Icon').find({ type: 'loading' })).toHaveLength(1);
  });

  // states & behaviors
  it('[uncontrolled] caches input value in internal state', () => {
    const wrapper = shallow(<PureSearchInput />);
    const inputWrapper = wrapper.find('input');

    expect(wrapper.state(INNER_VALUE)).toBe('');

    inputWrapper.simulate('change', { target: { value: 'foo' } });
    expect(wrapper.state(INNER_VALUE)).toBe('foo');

    inputWrapper.simulate('change', { target: { value: 'bar' } });
    expect(wrapper.state(INNER_VALUE)).toBe('bar');
  });

  it('[uncontrolled] takes defaultValue for input', () => {
    const wrapper = shallow(<PureSearchInput defaultValue="foo" />);

    expect(wrapper.state(INNER_VALUE)).toBe('foo');
  });

  it('[uncontrolled] clears input value and calls "onReset" on reset button click', () => {
    const handleReset = jest.fn();
    const wrapper = mount(<PureSearchInput onReset={handleReset} />);
    const inputWrapper = wrapper.find('input');

    inputWrapper.simulate('change', { target: { value: 'foo' } });
    expect(wrapper.state(INNER_VALUE)).toBe('foo');

    wrapper.find(`.${BEM.resetBtn}`).simulate('click');
    expect(handleReset).toHaveBeenLastCalledWith('foo');
    expect(wrapper.state(INNER_VALUE)).toBe('');
  });

  it('[controlled] test input value will be controlled by "value" prop', () => {
    const wrapper = shallow(<PureSearchInput value="foo" />);
    const inputWrapper = wrapper.find('input');
    expect(inputWrapper.prop('value')).toEqual('foo');
  });

  it('[controlled] calls "onChange" with new value on input change', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<PureSearchInput value="foo" onChange={handleChange} />);
    const inputWrapper = wrapper.find('input');

    inputWrapper.simulate('change', { target: { value: 'bar' } });
    expect(handleChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: { value: 'bar' },
      }),
    );
  });

  it('[controlled] calls "onReset" with last value on reset button click', () => {
    const handleReset = jest.fn();
    const wrapper = mount(<PureSearchInput value="foo" onReset={handleReset} />);
    wrapper.find(`.${BEM.resetBtn}`).simulate('click');
    expect(handleReset).toHaveBeenLastCalledWith('foo');
  });

  it('test auto focus input after reset button click', async () => {
    const handleReset = jest.fn();
    const handleFocus = jest.fn();
    const wrapper = mount(<PureSearchInput value="foo" onReset={handleReset} onFocus={handleFocus} />);
    const inputWrapper = wrapper.find('input');

    wrapper.find(`.${BEM.resetBtn}`).simulate('click');
    expect(inputWrapper.getDOMNode()).toEqual(document.activeElement);
  });

  it('calls "onSearch" prop with input value on "Enter" keyup', () => {
    const handleSearch = jest.fn();
    const wrapper = shallow(<PureSearchInput onSearch={handleSearch} />);
    const inputWrapper = wrapper.find('input');

    inputWrapper.simulate('change', { target: { value: 'foo' } });

    // Other keys should not trigger onSearch()
    inputWrapper.simulate('keyup', { key: 'Escape' });
    expect(handleSearch).not.toHaveBeenCalled();

    // Only Enter key should trigger
    inputWrapper.simulate('keyup', { key: 'Enter' });
    expect(handleSearch).toHaveBeenLastCalledWith('foo');
  });

  it.each([['controlled', '"value" prop'], ['uncontrolled', 'innerValue']])(
    '[%s] Receive new value from %s when search trigger',
    (isControlled) => {
      const handleSearch = jest.fn();
      const props = {
        value: isControlled ? 'foo' : undefined,
        onSearch: handleSearch,
      };
      const wrapper = shallow(<PureSearchInput {...props} />);
      const inputWrapper = wrapper.find('input');

      inputWrapper.simulate('change', { target: { value: 'foo' } });
      inputWrapper.simulate('keyup', { key: 'Enter' });

      const newValue = isControlled ? props.value : wrapper.state(INNER_VALUE);
      expect(handleSearch).toHaveBeenLastCalledWith(newValue);
    }
  );

  it.each([[true, 1], [false, 0]])(
    'when "searchOnInputBlur" prop is "%s", call "onSearch" prop on input blur or not',
    async (searchOnInputBlur, handleSerachCalledTimes) => {
      const handleSearch = jest.fn();
      const wrapper = shallow(
        <PureSearchInput
          onSearch={handleSearch}
          searchOnInputBlur={searchOnInputBlur}
        />
      );

      const inputWrapper = wrapper.find('input');
      inputWrapper.simulate('change', { target: { value: 'foo' } });
      inputWrapper.simulate('focus');
      inputWrapper.simulate('blur');
      await delay(ON_BLUR_SEARCH_DELAY);

      expect(handleSearch).toHaveBeenCalledTimes(handleSerachCalledTimes);
      if (searchOnInputBlur) {
        expect(handleSearch).toHaveBeenLastCalledWith('foo');
      }
    }
  );

  it(
    'test when "searchOnInputBlur" prop is true, searching (cause by input blur) after click reset button will be blocked',
    async () => {
      const handleSearch = jest.fn();
      const wrapper = mount(
        <PureSearchInput
          defalutValue="foo"
          onSearch={handleSearch}
          searchOnInputBlur
        />
      );

      const inputWrapper = wrapper.find('input');
      inputWrapper.simulate('change', { target: { value: 'foo' } });

      // inputWrapper.simulate('focus');

      // FIXME: simulate reset button behavior because of enzyme bug
      inputWrapper.simulate('blur');
      inputWrapper.getDOMNode().focus();
      // wrapper.find(`.${BEM.resetBtn}`).getDOMNode().click();

      await delay(ON_BLUR_SEARCH_DELAY);

      expect(handleSearch).toHaveBeenCalledTimes(0);
    }
  );

  it.each([[true, 1], [false, 0]])(
    'when "searchOnInputChange" prop is "%s", call "onSearch" prop on input change or not',
    (searchOnInputChange, handleSerachCalledTimes) => {
      const handleSearch = jest.fn();
      const wrapper = shallow(
        <PureSearchInput
          onSearch={handleSearch}
          searchOnInputChange={searchOnInputChange}
        />
      );

      const inputWrapper = wrapper.find('input');
      inputWrapper.simulate('change', { target: { value: 'foo' } });

      expect(handleSearch).toHaveBeenCalledTimes(handleSerachCalledTimes);
      if (searchOnInputChange) {
        expect(handleSearch).toHaveBeenLastCalledWith('foo');
      }
    }
  );

  it.each([[true, 1], [false, 2]])(
    'when "blockDuplicateValueSearch" prop is "%s", block duplicate value searching or not',
    (blockDuplicateValueSearch, handleSerachCalledTimes) => {
      const handleSearch = jest.fn();
      const wrapper = shallow(
        <PureSearchInput
          onSearch={handleSearch}
          blockDuplicateValueSearch={blockDuplicateValueSearch}
        />
      );

      const inputWrapper = wrapper.find('input');
      inputWrapper.simulate('change', { target: { value: 'foo' } });
      inputWrapper.simulate('keyup', { key: 'Enter' });

      expect(handleSearch).toHaveBeenCalledWith('foo');
      expect(handleSearch).toHaveBeenCalledTimes(1);

      // try to trigger onSearch again without value changing
      inputWrapper.simulate('keyup', { key: 'Enter' });
      expect(handleSearch).toHaveBeenCalledTimes(handleSerachCalledTimes);
      if (!blockDuplicateValueSearch) {
        expect(handleSearch).toHaveBeenLastCalledWith('foo');
      }
    }
  );

  it.each([[true, false, 0], [false, false, 1], [true, true, 0], [false, true, 1]])(
    'when "blockEmptyValueSearch" prop is "%s" and "searchOnInputChange" be "%s", block empty value searching or not',
    (blockEmptyValueSearch, searchOnInputChange, handleSerachCalledTimes) => {
      const handleSearch = jest.fn();
      const wrapper = shallow(
        <PureSearchInput
          defaultValue="foo"
          onSearch={handleSearch}
          blockEmptyValueSearch={blockEmptyValueSearch}
          searchOnInputChange={searchOnInputChange}
        />
      );

      const inputWrapper = wrapper.find('input');
      inputWrapper.simulate('change', { target: { value: '' } });

      if (!searchOnInputChange) {
        inputWrapper.simulate('keyup', { key: 'Enter' });
      }

      expect(handleSearch).toHaveBeenCalledTimes(handleSerachCalledTimes);
      if (!blockEmptyValueSearch) {
        expect(handleSearch).toHaveBeenLastCalledWith('');
      }
    }
  );
});
